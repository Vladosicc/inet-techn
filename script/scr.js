
        function calc()
        {
        var _a = parseFloat(document.getElementById("a_coeff").value);
        var _b = parseFloat(document.getElementById("b_coeff").value)
        var _c = parseFloat(document.getElementById("c_coeff").value)
        var _d = parseFloat(document.getElementById("d_coeff").value)

        var step = 0.01;
        var Result_P = [];
        Result_P[0] = parseFloat(document.getElementById("p0").value);
        var Result_V = [];
        Result_V[0] = parseFloat(document.getElementById("v0").value);
        var t = [];
        for(let i = 0; i < 4000; i++)
        {
            t[i] = i * step;
            Result_V[i+1] = CalcRK1(step, _a, _b, Result_V[i], Result_P[i]);
            Result_P[i+1] = CalcRK2(step, _c, _d, Result_V[i], Result_P[i]);
            t[i+1] = (i+1) * step;
        }

        var data = new google.visualization.DataTable();
        data.addColumn('number', 't');
        data.addColumn('number', 'Хищник');
        data.addColumn('number', 'Жертва');

        var data2 = new google.visualization.DataTable();
        data2.addColumn('number', 'Жертва');
        data2.addColumn('number', 'Хищник');

        var options = {
          title: 'Модель Лотки-Вольтерры',
          curveType: 'function',
          legend: { position: 'bottom' },
        };

        var options2 = {
            title: 'Модель Лотки-Вольтерры \nпо оси Х – жертвы, по оси У – хищники',
            curveType: 'function',
            legend: { position: 'none' },
          };

        var chart = new google.visualization.LineChart(document.getElementById('chart1'));
        var chart2 = new google.visualization.LineChart(document.getElementById('chart2'));
        for(let i = 0; i < t.length; i++)
        {
            data.addRow([
                t[i], Result_P[i], Result_V[i]
            ])
            data2.addRow([
                Result_V[i], Result_P[i]
            ])
        }

        chart.draw(data, options);
        chart2.draw(data2, options2);
        }

        function CalcRK1(h, a, b, y1, y2)
        {
            var k1 = h * func1(a, b, y1, y2);
            var k2 = h * func1(a, b, y1 + k1 * (h / 2.0), y2);
            var k3 = h * func1(a, b, y1 + k2 * (h / 2.0), y2);
            var k4 = h * func1(a, b, y1 + k3 * (h / 2.0), y2);
            return y1 + (k1 + 2.0 * k2 + 2.0 * k3 + k4) / 6.0;
        }

        function CalcRK2(h, c, d, y1, y2)
        {
            var k1 = h * func2(c, d, y1, y2);
            var k2 = h * func2(c, d, y1, y2 + k1 * (h / 2.0));
            var k3 = h * func2(c, d, y1, y2 + k2 * (h / 2.0));
            var k4 = h * func2(c, d, y1, y2 + k3 * (h / 2.0));
            return y2 + (k1 + 2.0 * k2 + 2.0 * k3 + k4) / 6.0;

        }

        function func1(a, b, V, P)
        {
            return (a * V - b * P * V);
        }

        function func2(c, d, V, P)
        {
            return (-c * P + d * V * P);
        }
