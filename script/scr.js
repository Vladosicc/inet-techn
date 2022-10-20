
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
        var k1, k2, k3, k4;
        for(let i = 0; i < 4000; i++)
        {
            t[i] = i * step;
            //func1
            k1 = step * func1(Result_P[i], Result_V[i], _a, _b);
            k2 = step * func1(Result_P[i], Result_V[i] + k1/2., _a, _b);
            k3 = step * func1(Result_P[i], Result_V[i] + k2/2., _a, _b);
            k4 = step * func1(Result_P[i], Result_V[i] + k3, _a, _b);
            Result_P[i + 1] = Result_P[i] + (1. / 6.) * (k1 + 2 * k2 + 2 * k3 + k4);

            //func2
            k1 = step * func2(Result_P[i], Result_V[i], _c, _d);
            k2 = step * func2(Result_P[i] + k1/2., Result_V[i], _c, _d);
            k3 = step * func2(Result_P[i] + k2/2., Result_V[i], _c, _d);
            k4 = step * func2(Result_P[i] + k3, Result_V[i], _c, _d);
            Result_V[i + 1] = Result_V[i] + (1. / 6.) * (k1 + 2 * k2 + 2 * k3 + k4);
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
        for(let i = 0; i < 10000; i++)
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

        function func1(V, P, _a, _b)
        {
            return (_a - _b * P) * V;
        }

        function func2(V, P, _c, _d)
        {
            return (-_c + _d * V) * P;
        }