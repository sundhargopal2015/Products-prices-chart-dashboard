import React, { useCallback, useEffect, useState } from "react";
import SelectedCategoryView from "./SelectedCategoryView";
import AllCategories from "./AllCategories";
import { Category, Product, ProductsResponse } from "./Types";
import { AppContainer, ChartContainer } from "./StyledComponents";
import Filter from "./Filter";
import { CircularProgress, SelectChangeEvent } from "@mui/material";
import axios from "axios";

const defaultCateGory: Category = { name: "", slug: "", url: "" };
const BASE_API_URL = "https://dummyjson.com/products/";

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>({
    name: "",
    slug: "",
    url: "",
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [selectedProductsIds, setSelectedProductsIds] = useState<string[]>([]);

  const handleCategorySelect = useCallback(
    (event: SelectChangeEvent) => {
      const { value } = event.target;
      const category =
        categories.find(({ slug }) => slug === value) || defaultCateGory;
      setSelectedCategory(category);
      setSelectedProductsIds([]);
    },
    [categories]
  );

  const handleProductsSelect = useCallback(
    (event: SelectChangeEvent<typeof selectedProductsIds>) => {
      const value = event.target.value as string[];
      setSelectedProductsIds(value);
    },
    []
  );

  const handleRunReport = useCallback(() => {
    setLoading(true);
    //delay to show spinner
    setTimeout(() => {
      setSelectedProducts(
        products.filter((product) =>
          selectedProductsIds.includes(product.id.toString())
        )
      );
      setLoading(false);
    }, 3000);
  }, [products, selectedProductsIds]);

  const handleClear = useCallback(() => {
    setSelectedCategory(defaultCateGory);
    setProducts([]);
    setSelectedProductsIds([]);
    setSelectedProducts([]);
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get<Category[]>(
          `${BASE_API_URL}/categories`
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory.name) {
      const getProducts = async () => {
        try {
          const response = await axios.get<ProductsResponse>(
            `${BASE_API_URL}category/${selectedCategory.slug}`
          );
          setProducts(response.data.products);
        } catch (error) {
          console.error("Error fetching products:", error);
        } finally {
          setLoading(false);
        }
      };
      getProducts();
    }
  }, [selectedCategory]);

  return (
    <AppContainer>
      <Filter
        handleCategoryChange={handleCategorySelect}
        handleProductChange={handleProductsSelect}
        categories={categories}
        products={products}
        selectedCategoryValue={selectedCategory.slug}
        selectedProductsIds={selectedProductsIds}
        handleRunReport={handleRunReport}
        loading={loading}
        handleClear={handleClear}
      />
      <ChartContainer>
        {!!loading ? (
          <CircularProgress />
        ) : (
          <>
            {!selectedCategory.name && (
              <AllCategories categories={categories} />
            )}
            {!!(selectedCategory.name || selectedProducts.length) && (
              <SelectedCategoryView
                categoryName={selectedCategory.name}
                products={selectedProducts.length ? selectedProducts : products}
              />
            )}
          </>
        )}
      </ChartContainer>
    </AppContainer>
  );
};

export default App;
