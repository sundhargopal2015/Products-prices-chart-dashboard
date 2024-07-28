import styled from "styled-components";

export const AppContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 24px;
  display: flex;
  box-sizing: border-box;
`;

export const ChartContainer = styled.div`
  width: 100%;
  max-width: 900px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const FilterContainer = styled.div`
  width: 100%;
  max-width: 300px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  border: 1px solid #000000;
  height: 90vh;
`;
export const FilterHeaderWrapper = styled.div`
  width: 100%;
`;
export const FilterHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const FilterBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  margin-top: 40px;
`;
export const FilterFooter = styled.div`
  text-align: center;
  width: 100%;
`;
