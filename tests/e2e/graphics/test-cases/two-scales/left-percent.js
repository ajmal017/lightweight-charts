function generateCandle(i, target) {
	var step = (i % 20) / 5000;
	var base = i / 5;

	var sign = (i % 2) ? 1 : -1;
	target.open = base * (1 - sign * step);
	target.high = base * (1 + 4 * step);
	target.low = base * (1 - 4 * step);
	target.close = base * (1 + sign * step);
}

function generateData() {
	var res = [];
	var time = new Date(Date.UTC(2018, 0, 1, 0, 0, 0, 0));
	for (var i = 0; i < 500; ++i) {
		var item = {
			time: time.getTime() / 1000,
		};
		time.setUTCDate(time.getUTCDate() + 1);

		generateCandle(i, item);
		res.push(item);
	}
	return res;
}

function generateDataHist() {
	var colors = [
		'#013370',
		'#3a9656',
		undefined, // default color should be used
	];

	var res = [];
	var time = new Date(Date.UTC(2018, 0, 1, 0, 0, 0, 0));
	for (var i = 0; i < 500; ++i) {
		res.push({
			time: time.getTime() / 1000,
			value: i,
			color: colors[i % colors.length],
		});

		time.setUTCDate(time.getUTCDate() + 1);
	}
	return res;
}

// eslint-disable-next-line no-unused-vars
function runTestCase(container) {
	var chart = LightweightCharts.createChart(container, {
		leftPriceScale: {
			visible: true,
		},
	});

	var mainSeries = chart.addBarSeries({
		borderColor: 'rgba(0, 0, 255, 0.2)',
		upColor: 'rgba(0, 80, 0, 0.4)',
		downColor: 'rgba(80, 0, 0, 0.4)',
		thinBars: false,
		priceScaleId: 'right',
	});

	mainSeries.setData(generateData());

	var histSeries = chart.addHistogramSeries({
		lineWidth: 1,
		color: '#ff0000',
		priceLineWidth: 1,
		priceLineStyle: LightweightCharts.LineStyle.LargeDashed,
		priceScaleId: 'left',
		scaleMargins: {
			top: 0.75,
			bottom: 0,
		},
	});

	histSeries.setData(generateDataHist());

	chart.priceScale('left').applyOptions({
		mode: LightweightCharts.PriceScaleMode.Percentage,
	});
}
