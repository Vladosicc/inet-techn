function calc()
{
    //Размер сетки
    var I = 8;
    var J = 9;

    var a = 1;

    //Шаг по i
    var h = 0.1;
    //Шаг по j
    var t = 0.05;
    var l = t/h;

    //Создаем пустую сетку размером j+1, i+1
    var u = new Array(J+1);
    for(let i = 0; i < J+1; i++)
    {
        u[i] = new Array(I+1);
    }
    
    //Дальше по методичке
    //Заполняем первый и последний столбец
    for(let j = 0; j < J; j++)
    {
        u[j][0] = fi2(j*t);
        u[j][I] = fi3(j*t);
    }

    //Заполняем первую строку
    for(let i = 0; i < I; i++)
    {
        u[0][i] = func(i*h);
    }

    //Вторую строку
    for(let i = 0; i < I; i++)
    {
        u[1][i] = func(i*h) + t*fi1(i*h);
    }

    //i+1 строку начиная с i = 1
    for(let i = 1; i < J; i++)
    {
        for(var j = 1; j < I; j++)
        {
            u[i+1][j] = 2 * (1 - Math.pow(a,2) * Math.pow(l,2))*u[i][j] + Math.pow(a,2) * Math.pow(l,2)*(u[i][j+1] + u[i][j-1]) - u[i-1][j];
        }
    }

    //Дальше график
    var z_data=[ ]
for(var i=0;i<J;i++)
{
  z_data.push(u[i]);
}

var data = [{
           z: z_data,
           type: 'surface'
        }];

var layout = {
  title: 'Волновое уравнение',
  autosize: false,
  width: 1000,
  height: 500,
  margin: {
    l: 65,
    r: 50,
    b: 65,
    t: 90,
  }
};
Plotly.newPlot('myDiv', data, layout);

var grid = document.getElementById("grid");
grid.innerText = "";
for(let i = 0; i < J+1; i++)
{
    for(let j = 0; j < I+1; j++)
    {
        grid.innerText += u[i][j].toFixed(3);
        grid.innerText += "|";
    }
    grid.innerText += '\n';
}
}

function func(x)
{
    return 0.2*(1-x)*Math.sin(Math.PI*x);
    //return Math.pow(x,2) * Math.cos(Math.PI*x);
}

function fi2(t)
{
    return 0;
    //return 0.5 * t;
}

function fi3(t)
{
    return 0;
    //return t-1;
}

function fi1(x)
{
    return 0;
    //return x**2 * (x+1);
}