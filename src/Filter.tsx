import React, { useMemo } from "react";
import {
  FilterBody,
  FilterContainer,
  FilterFooter,
  FilterHeader,
  FilterHeaderWrapper,
} from "./StyledComponents";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { Category, Product } from "./Types";
interface FilterProps {
  categories?: Category[];
  products?: Product[];
  handleCategoryChange: (value: SelectChangeEvent) => void;
  handleProductChange: (value: SelectChangeEvent<string[]>) => void;
  selectedCategoryValue: string;
  selectedProductsIds: string[];
  handleRunReport: () => void;
  loading: boolean;
  handleClear: () => void;
}
const Filter: React.FC<FilterProps> = ({
  categories,
  products,
  handleCategoryChange,
  handleProductChange,
  selectedCategoryValue,
  selectedProductsIds,
  handleRunReport,
  loading,
  handleClear,
}) => {
  const categoryOptions = useMemo(() => {
    const _categoryOptions = categories?.map(({ name, slug }) => (
      <MenuItem value={slug} key={slug}>
        {name}
      </MenuItem>
    ));
    _categoryOptions?.unshift(
      <MenuItem value="" key="clear-category">
        Clear
      </MenuItem>
    );
    return _categoryOptions;
  }, [categories]);

  const productOptions = useMemo(
    () =>
      products?.map(({ title, id }) => (
        <MenuItem value={id} key={id}>
          {title}
        </MenuItem>
      )),
    [products]
  );
  return (
    <FilterContainer>
      <FilterHeaderWrapper>
        <FilterHeader>
          <Typography variant="h4">Filters</Typography>
          <Button
            variant="text"
            sx={{ textTransform: "none" }}
            onClick={handleClear}
          >
            Clear
          </Button>
        </FilterHeader>
        <FilterBody>
          <FormControl fullWidth>
            <InputLabel id="label-for-category-select">
              Select category
            </InputLabel>
            <Select
              labelId="label-for-category-select"
              label="Select category"
              onChange={handleCategoryChange}
              value={selectedCategoryValue}
            >
              {categoryOptions}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="label-for-product-select">
              Select product
            </InputLabel>
            <Select
              labelId="label-for-product-select"
              label="Select category"
              onChange={handleProductChange}
              multiple
              value={selectedProductsIds}
              disabled={!selectedCategoryValue}
            >
              {productOptions}
            </Select>
          </FormControl>
        </FilterBody>
      </FilterHeaderWrapper>
      <FilterFooter>
        <Button
          variant="contained"
          sx={{ textTransform: "none" }}
          disabled={!selectedCategoryValue || loading}
          onClick={handleRunReport}
          fullWidth
        >
          Run report
        </Button>
      </FilterFooter>
    </FilterContainer>
  );
};
export default React.memo(Filter);
