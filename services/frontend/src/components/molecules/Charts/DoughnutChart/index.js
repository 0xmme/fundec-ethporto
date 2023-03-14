/**
=========================================================
* Soft UI Dashboard PRO React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useMemo } from "react";

// porp-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-chartjs-2 components
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard PRO React components
import SoftBox from "components/atoms/SoftBox";
import SoftTypography from "components/atoms/SoftTypography";

// DoughnutChart configurations
import configs from "components/molecules/Charts/DoughnutChart/configs";

ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart({ title, description, height, chart }) {
  const { data, options } = configs(chart.labels || [], chart.datasets || {}, chart.cutout);

  const renderChart = (
    <SoftBox p={2}>
      {title || description ? (
        <SoftBox px={description ? 1 : 0} pt={description ? 1 : 0}>
          {title && (
            <SoftBox mb={1}>
              <SoftTypography variant="h6">{title}</SoftTypography>
            </SoftBox>
          )}
          <SoftBox mb={2}>
            <SoftTypography component="div" variant="button" fontWeight="regular" color="text">
              {description}
            </SoftTypography>
          </SoftBox>
        </SoftBox>
      ) : null}
      <SoftBox height={height} position="relative">
        <SoftBox
          position="absolute"
          top="50%"
          left="50%"
          sx={{ transform: "translate(-50%, -50%) !important" }}
          display="flex"
          flexDirection="row"
        >
          <SoftTypography variant="h2" color="info" fontWeight="bold">
            10%
          </SoftTypography>
          <SoftBox marginTop="auto" marginBottom="auto" marginLeft="0.3rem">
            <SoftTypography variant="h6">APY</SoftTypography>
          </SoftBox>
        </SoftBox>
        <Doughnut data={data} options={options} />
      </SoftBox>
    </SoftBox>
  );

  return title || description ? <Card>{renderChart}</Card> : renderChart;
}

// Setting default values for the props of DoughnutChart
DoughnutChart.defaultProps = {
  title: "",
  description: "",
  height: "19.125rem",
};

// Typechecking props for the DoughnutChart
DoughnutChart.propTypes = {
  title: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  chart: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.array, PropTypes.object])).isRequired,
};

export default DoughnutChart;
