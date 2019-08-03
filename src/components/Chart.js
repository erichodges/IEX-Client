import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import PropTypes from "prop-types";
import React from "react";
import { Chart, ChartCanvas } from "react-stockcharts";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { CrossHairCursor, CurrentCoordinate, MouseCoordinateX, MouseCoordinateY } from "react-stockcharts/lib/coordinates";
import { fitWidth } from "react-stockcharts/lib/helper";
import { ema, sma } from "react-stockcharts/lib/indicator";
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { BarSeries, CandlestickSeries, LineSeries } from "react-stockcharts/lib/series";
import { MovingAverageTooltip, OHLCTooltip } from "react-stockcharts/lib/tooltip";
import { last } from "react-stockcharts/lib/utils";


// want to have sma 5, 50, 200 and ema 13, 21
class CandleStickChartWithMA extends React.Component {
  render() {
    const sma50 = sma()
      .options({ windowSize: 50 })
      .merge((d, c) => {
        d.sma50 = c;
      })
      .accessor(d => d.sma50)
      .stroke("#1976d2");

    const ema21 = ema()
      .options({ windowSize: 21 })
      .merge((d, c) => {
        d.ema21 = c;
      })
      .accessor(d => d.ema21)
      .stroke("#f5f5f5");
    const { type, data: initialData, width, ratio } = this.props;

    const candlesAppearance = {
      wickStroke: function stroke(d) {
        return d.close > d.open ? "#18A81B" : "#FC0D1B";
      },
      fill: function fill(d) {
        return d.close > d.open ? "#18A81B" : "#FC0D1B";
      },
      stroke: function stroke(d) {
        return d.close > d.open ? "#18A81B" : "#FC0D1B";
      },
      candleStrokeWidth: 1,
      widthRatio: 0.8,
      opacity: 1
    };

    const calculatedData = ema21(sma50(initialData));
    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
      d => d.date
    );
    const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(
      calculatedData
    );

    const start = xAccessor(last(data));
    const end = xAccessor(data[0]);
    const xExtents = [start, end];

    return (
      <ChartCanvas
        height={600}
        width={width}
        ratio={ratio}
        margin={{ left: 70, right: 70, top: 10, bottom: 30 }}
        padding={{ left: 0, right: 15 }}
        type={type}
        seriesName=""
        data={data}
        xScale={xScale}
        xAccessor={xAccessor}
        displayXAccessor={displayXAccessor}
        xExtents={xExtents}
        clamp={true}
        pointsPerPxThreshold={1}
        // plotFull={true}
      >
        <Chart
          id={2}
          yExtents={[d => d.volume]}
          height={150}
          origin={(w, h) => [0, h - 150]}
        >
          <YAxis
            axisAt="left"
            orient="left"
            ticks={5}
            tickFormat={format(".2s")}
            tickStroke="#f5f5f5"
          />
          <MouseCoordinateX
            at="bottom"
            orient="bottom"
            displayFormat={timeFormat("%Y-%m-%d")}
          />
          <MouseCoordinateY
            at="left"
            orient="left"
            displayFormat={format(".4s")}
          />
          <BarSeries
            yAccessor={d => d.volume}
            fill={d => (d.close > d.open ? "#555555" : "#555555")}
          />
          <CurrentCoordinate yAccessor={d => d.volume} />
        </Chart>
        <Chart
          id={1}
          yExtents={[d => [d.high, d.low], sma50.accessor(), ema21.accessor()]}
          padding={{ top: 10, bottom: 20 }}
        >
          <XAxis
            axisAt="bottom"
            orient="bottom"
            tickStroke="#f5f5f5"
            stroke="#f5f5f5"
            fontFamily="Roboto"
          />
          <YAxis
            axisAt="right"
            orient="right"
            ticks={5}
            stroke="#f5f5f5"
            tickStroke="#f5f5f5"
            fontFamily="Roboto"
          />
          <MouseCoordinateY
            at="right"
            orient="right"
            displayFormat={format(".2f")}
            fontFamily="Roboto"
          />
          <CandlestickSeries {...candlesAppearance} clip={false} />

          <LineSeries yAccessor={sma50.accessor()} stroke={sma50.stroke()} />

          <LineSeries yAccessor={ema21.accessor()} stroke={ema21.stroke()} />

          <CurrentCoordinate
            yAccessor={sma50.accessor()}
            fill={sma50.stroke()}
          />

          <CurrentCoordinate
            yAccessor={ema21.accessor()}
            fill={ema21.stroke()}
          />
          {/*/ textFill and labelFill control the colors!! */}
          <OHLCTooltip
            origin={[-40, 0]}
            textFill="#f5f5f5"
            labelFill="#f5f5f5"
            fontFamily="Roboto"
            fontSize={12}
          />
          <MovingAverageTooltip
            fontFamily="Roboto"
            textFill="#f5f5f5"
            labelFill="#f5f5f5"
            onClick={e => console.log(e)}
            origin={[-38, 15]}
            options={[
              {
                yAccessor: sma50.accessor(),
                type: "SMA",
                stroke: sma50.stroke(),
                windowSize: sma50.options().windowSize,
                echo: "some echo here"
              },
              {
                yAccessor: ema21.accessor(),
                type: "EMA",
                stroke: ema21.stroke(),
                windowSize: ema21.options().windowSize,
                echo: "some echo here"
              }
            ]}
          />
        </Chart>

        <CrossHairCursor stroke="#f5f5f5" />
      </ChartCanvas>
    );
  }
}

CandleStickChartWithMA.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  ratio: PropTypes.number.isRequired,
  type: PropTypes.oneOf(["svg", "hybrid"]).isRequired
};

CandleStickChartWithMA.defaultProps = {
  type: "hybrid"
};
CandleStickChartWithMA = fitWidth(CandleStickChartWithMA);

export default CandleStickChartWithMA;
