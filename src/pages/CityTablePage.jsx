// import { useEffect, useState } from "react";

import styled from "styled-components";
// import axios from "axios";
// import LoadingSpinner from "../ui/LoadingSpinner";
import CityTable from "../components/CityTable";

const PageContainer = styled.div`
  padding-top: 60px;
`;

function CityTablePage() {
  return (
    <>
      <PageContainer>
        <CityTable />
      </PageContainer>
    </>
  );
}

export default CityTablePage;
