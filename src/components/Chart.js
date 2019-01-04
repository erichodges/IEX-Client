import React from "react";
import PropTypes from "prop-types";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import { ChartCanvas, Chart } from "react-stockcharts";
import {
  BarSeries,
  CandlestickSeries,
  LineSeries
} from "react-stockcharts/lib/series";

import { XAxis, YAxis } from "react-stockcharts/lib/axes";

import {
  CrossHairCursor,
  CurrentCoordinate,
  MouseCoordinateX,
  MouseCoordinateY
} from "react-stockcharts/lib/coordinates";

import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";

import {
  OHLCTooltip,
  MovingAverageTooltip
} from "react-stockcharts/lib/tooltip";

import { ema, sma } from "react-stockcharts/lib/indicator";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";

// want to have sma 5, 50, 200 and ema 13, 21
class CandleStickChartWithMA extends React.Component {
  render() {
    const ema13 = ema()
      .options({
        windowSize: 13, // optional will default to 10
        sourcePath: "close" // optional will default to close as the source
      })
      .skipUndefined(true) // defaults to true
      .merge((d, c) => {
        d.ema13 = c;
      }) // Required, if not provided, log a error
      .accessor(d => d.ema13) // Required, if not provided, log an error during calculation
      .stroke("blue"); // Optional. This sets the moving avg color!!

    const sma5 = sma()
      .options({ windowSize: 5 })
      .merge((d, c) => {
        d.sma5 = c;
      })
      .accessor(d => d.sma5)
      .stroke("green");

    const sma50 = sma()
      .options({ windowSize: 50 })
      .merge((d, c) => {
        d.sma50 = c;
      })
      .accessor(d => d.sma50)
      .stroke("black");

    const ema21 = ema()
      .options({ windowSize: 21 })
      .merge((d, c) => {
        d.ema21 = c;
      })
      .accessor(d => d.ema21)
      .stroke("red");
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

    const calculatedData = ema13(sma5(ema21(sma50(initialData))));
    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
      d => d.date
    );
    const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(
      calculatedData
    );

    const start = xAccessor(last(data));
    const end = xAccessor(data[Math.max(0, data.length - 150)]);
    const xExtents = [start, end];

    return (
      <ChartCanvas
        height={600}
        width={width}
        ratio={ratio}
        margin={{ left: 70, right: 70, top: 10, bottom: 30 }}
        type={type}
        seriesName=""
        data={data}
        xScale={xScale}
        xAccessor={xAccessor}
        displayXAccessor={displayXAccessor}
        xExtents={xExtents}
        clamp={true}
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
          <CurrentCoordinate yAccessor={d => d.volume} fill="#9B0A47" />
        </Chart>
        <Chart
          id={1}
          yExtents={[
            d => [d.high, d.low],
            sma5.accessor(),
            sma50.accessor(),
            ema13.accessor(),
            ema21.accessor()
          ]}
          padding={{ top: 10, bottom: 20 }}
        >
          <XAxis axisAt="bottom" orient="bottom" />
          <YAxis axisAt="right" orient="right" ticks={5} />

          <MouseCoordinateY
            at="right"
            orient="right"
            displayFormat={format(".2f")}
          />

          <CandlestickSeries {...candlesAppearance} clip={false} />
          <LineSeries yAccessor={sma5.accessor()} stroke={sma5.stroke()} />
          <LineSeries yAccessor={sma50.accessor()} stroke={sma50.stroke()} />
          <LineSeries yAccessor={ema13.accessor()} stroke={ema13.stroke()} />
          <LineSeries yAccessor={ema21.accessor()} stroke={ema21.stroke()} />
          <CurrentCoordinate yAccessor={sma5.accessor()} fill={sma5.stroke} />
          <CurrentCoordinate
            yAccessor={sma50.accessor()}
            fill={sma50.stroke()}
          />
          <CurrentCoordinate
            yAccessor={ema13.accessor()}
            fill={ema13.stroke()}
          />
          <CurrentCoordinate
            yAccessor={ema21.accessor()}
            fill={ema21.stroke()}
          />

          <OHLCTooltip origin={[-40, 0]} />
          <MovingAverageTooltip
            onClick={e => console.log(e)}
            origin={[-38, 15]}
            options={[
              {
                yAccessor: sma5.accessor(),
                type: "SMA",
                stroke: sma5.stroke(),
                windowSize: sma5.options().windowSize,
                echo: "some echo here"
              },
              {
                yAccessor: sma50.accessor(),
                type: "SMA",
                stroke: sma50.stroke(),
                windowSize: sma50.options().windowSize,
                echo: "some echo here"
              },
              {
                yAccessor: ema13.accessor(),
                type: "EMA",
                stroke: ema13.stroke(),
                windowSize: ema13.options().windowSize,
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

        <CrossHairCursor />
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
  type: "svg"
};
CandleStickChartWithMA = fitWidth(CandleStickChartWithMA);

export default CandleStickChartWithMA;
