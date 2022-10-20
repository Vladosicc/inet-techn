function open1()
{
    open("lab1Card");
}

function open2()
{
    open("lab2Card");
}

function open3()
{
    open("lab3Card");
}

function openExam()
{
    open("examCard");
}

function open(id)
{
    document.getElementById("lab1Card").style.display = "none";
    document.getElementById("lab2Card").style.display = "none";
    document.getElementById("lab3Card").style.display = "none";
    document.getElementById("examCard").style.display = "none";

    document.getElementById(id).style.display = "";
}