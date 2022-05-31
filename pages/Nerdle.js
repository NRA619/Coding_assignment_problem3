import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Calc from "expression-calculator";

export default function Nerdle() {
  // Column array
  const data1 = {
    colm: [
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
    ],
    idx: 0,
  };

  // Color Array
  const color1 = [
    [
      "#64748b",
      "#64748b",
      "#64748b",
      "#64748b",
      "#64748b",
      "#64748b",
      "#64748b",
    ],
    [
      "#64748b",
      "#64748b",
      "#64748b",
      "#64748b",
      "#64748b",
      "#64748b",
      "#64748b",
    ],
    [
      "#64748b",
      "#64748b",
      "#64748b",
      "#64748b",
      "#64748b",
      "#64748b",
      "#64748b",
    ],
    [
      "#64748b",
      "#64748b",
      "#64748b",
      "#64748b",
      "#64748b",
      "#64748b",
      "#64748b",
    ],
    [
      "#64748b",
      "#64748b",
      "#64748b",
      "#64748b",
      "#64748b",
      "#64748b",
      "#64748b",
    ],
  ];

  // variable using react hooks
  const [col, setCol] = useState(color1);

  const [todos, setTodos] = useState(data1);
  const [row, setRows] = useState(0);

  const [ck, setCk] = useState(7);
  const [how, setHow] = useState(false);
  const router = useRouter();
  const final_ans = router.query.data;
  const ck1 = router.query.data2;
  const row1 = router.query.data3;


  // React hooks useEffect
  useEffect(async () => {
    if (row1 != undefined) {
      var l = 0;
      const diff = row1 - 5;
      while (l < diff) {
          todos.colm.push(data1.colm[0]);
          col.push(color1[0]);
        l++;
      }
    }
    if (ck1 != undefined) {
      var l = 0;
      const diff = ck1 - ck;
      while (l < diff) {
        var z = 0;
        while (z < 5) {
          todos.colm[z].push("");
          col[z].push("#64748b");
          z++;
        }

        l++;
      }
      setCk(ck1);
    }
  }, [final_ans]);

  //Updating Values
  const handleUpdate = (todo) => {
    if (row < row1) {
      if (todos != undefined && todos.idx < ck) {
        const newTodos = [...todos.colm];
        newTodos[row][todos.idx] = todo;
        setTodos({
          colm: newTodos,
          idx: todos.idx + 1,
        });
      }
    } else {
      return alert("out of move");
    }
  };

  // deleting values
  const handleremove = (todo) => {
    if (todos != undefined && todos.idx >= 0) {
      const newTodos = [...todos.colm];
      newTodos[row][todos.idx - 1] = todo;
      setTodos({
        colm: newTodos,
        idx: todos.idx - 1,
      });
    } else {
      return alert("out of move");
    }
  };

  // After submitting 
  const onsubmit = () => {
    var i = 0;
    var count = "";
    var count2 = "";
    var res = "";
    while (i < ck && todos.colm[row][i] != "=") {
      count = count + todos.colm[row][i];
      i++;
    }
    if (todos.colm[row][i] == "=") {
      i++;
      while (i < ck) {
        res = res + todos.colm[row][i];
        i++;
      }
    }
    var calc = new Calc();
    try {
      const t = calc.compile(count).calc();
    } catch (err) {
      return alert("Invalid expression" + " " + err);
    }
    i = 0;
    while (i < ck) {
      count2 = count2 + todos.colm[row][i];
      i++;
    }

    if (calc.compile(count).calc() != res) {
      if (count2.includes("=")) {
        return alert("not equal");
      } else {
        return alert("without equal invalid expression");
      }
    } else {
      if (row + 1 < row1) {
        i = 0;
        while (i < ck) {
          if (count2[i] == final_ans[i]) {
            const newCols = [...col];
            newCols[row][i] = "#84cc16";
            setCol(newCols);
          }
          i++;
        }
        i = 0;
        var j = 0;
        while (i < ck) {
          while (j < ck) {
            if (count2[i] == final_ans[j] && col[row][i] != "#84cc16") {
              const newCols = [...col];
              newCols[row][i] = "red";
              setCol(newCols);
            }
            j++;
          }
          i++;
          j = 0;
        }
        i = 0;
        while (i < ck) {
          if (col[row][i] == "#64748b") {
            const newCols = [...col];
            newCols[row][i] = "black";
            setCol(newCols);
          }
          i++;
        }
        i = 0;
        var p = 0;
        while (i < ck) {
          if (
            col[row][i] == "#64748b" ||
            col[row][i] == "red" ||
            col[row][i] == "black"
          ) {
            p = p + 1;
          }
          i++;
        }
        if (p == 0) {
          alert("You Won");
          return window.location.reload();
        } else {
          setRows(row + 1);
          todos.idx = 0;
        }
      } else {
        alert("Sorry You Lost");
        return window.location.reload();
      }
    }
  };

  return (
    <div className="min-h-screen h-full w-full bg-gray-900 flex flex-col justify-center">
      <div className="flex flex-col space-y-2 items-center">
        <div className="flex justify-start space-x-3 text-white underline">
          <span onClick={() => setHow(true)} className="hover:cursor-pointer">
            How to play
          </span>
          <span
            onClick={() => (window.location = "/")}
            className="hover:cursor-pointer"
          >
            Go back
          </span>
        </div>
        {todos.colm?.map((data, index) => (
          <div className="space-x-2 flex " key={index}>
            <span className="flex justify-center space-x-2">
              {data.map((dat, inf) => (
                <div
                  key={inf}
                  style={{
                    backgroundColor: col[index][inf],
                  }}
                  className="h-10 text-white w-10 shadow-sm rounded-sm flex justify-center space-x-2 items-center"
                >
                  <span>{dat}</span>
                </div>
              ))}
            </span>
          </div>
        ))}
      </div>
      <div className="pt-10 flex flex-col items-center space-y-2">
        <div className="flex space-x-2">
          <button
            onClick={() => handleUpdate(0)}
            className="h-10 w-10 flex justify-center items-center focus:animate-ping transform hover:-translate-y-1 hover:scale-110 transition ease-in-out delay-150 bg-blue-600 text-red-50 shadow-sm rounded-sm "
          >
            <span>0</span>
          </button>
          <button
            onClick={() => handleUpdate(1)}
            className="h-10 w-10 flex justify-center items-center focus:animate-ping transform hover:-translate-y-1 hover:scale-110 transition ease-in-out delay-150 bg-blue-600 text-red-50 shadow-sm rounded-sm "
          >
            <span>1</span>
          </button>
          <button
            onClick={() => handleUpdate(2)}
            className="h-10 w-10 flex justify-center items-center focus:animate-ping transform hover:-translate-y-1 hover:scale-110 transition ease-in-out delay-150 bg-blue-600 text-red-50 shadow-sm rounded-sm "
          >
            <span>2</span>
          </button>
          <button
            onClick={() => handleUpdate(3)}
            className="h-10 w-10 flex justify-center items-center focus:animate-ping transform hover:-translate-y-1 hover:scale-110 transition ease-in-out delay-150 bg-blue-600 text-red-50 shadow-sm rounded-sm "
          >
            <span>3</span>
          </button>
          <button
            onClick={() => handleUpdate(4)}
            className="h-10 w-10 flex justify-center items-center focus:animate-ping transform hover:-translate-y-1 hover:scale-110 transition ease-in-out delay-150 bg-blue-600 text-red-50 shadow-sm rounded-sm "
          >
            <span>4</span>
          </button>
          <button
            onClick={() => handleUpdate(5)}
            className="h-10 w-10 flex justify-center items-center focus:animate-ping transform hover:-translate-y-1 hover:scale-110 transition ease-in-out delay-150 bg-blue-600 text-red-50 shadow-sm rounded-sm "
          >
            <span>5</span>
          </button>
          <button
            onClick={() => handleUpdate(6)}
            className="h-10 w-10 flex justify-center items-center focus:animate-ping transform hover:-translate-y-1 hover:scale-110 transition ease-in-out delay-150 bg-blue-600 text-red-50 shadow-sm rounded-sm "
          >
            <span>6</span>
          </button>
          <button
            onClick={() => handleUpdate(7)}
            className="h-10 w-10 flex justify-center items-center focus:animate-ping transform hover:-translate-y-1 hover:scale-110 transition ease-in-out delay-150 bg-blue-600 text-red-50 shadow-sm rounded-sm "
          >
            <span>7</span>
          </button>
          <button
            onClick={() => handleUpdate(8)}
            className="h-10 w-10 flex justify-center items-center focus:animate-ping transform hover:-translate-y-1 hover:scale-110 transition ease-in-out delay-150 bg-blue-600 text-red-50 shadow-sm rounded-sm "
          >
            <span>8</span>
          </button>
          <button
            onClick={() => handleUpdate(9)}
            className="h-10 w-10 flex justify-center items-center focus:animate-ping transform hover:-translate-y-1 hover:scale-110 transition ease-in-out delay-150 bg-blue-600 text-red-50 shadow-sm rounded-sm "
          >
            <span>9</span>
          </button>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => handleUpdate("*")}
            className="h-10 w-10 flex justify-center items-center focus:animate-ping transform hover:-translate-y-1 hover:scale-110 transition ease-in-out delay-150 bg-blue-700 text-white shadow-sm rounded-md"
          >
            <span>*</span>
          </button>
          <button
            onClick={() => handleUpdate("+")}
            className="h-10 w-10 flex justify-center items-center focus:animate-ping transform hover:-translate-y-1 hover:scale-110 focus:animate-ping transform hover:-translate-y-1 hover:scale-110 transition ease-in-out delay-150 bg-blue-700 text-white shadow-sm rounded-md"
          >
            <span>+</span>
          </button>
          <button
            onClick={() => handleUpdate("-")}
            className="h-10 w-10 flex justify-center items-center focus:animate-ping transform hover:-translate-y-1 hover:scale-110 transition ease-in-out delay-150 bg-blue-700 text-white shadow-sm rounded-md"
          >
            <span> - </span>
          </button>
          <button
            onClick={() => handleUpdate("/")}
            className="h-10 w-10 flex justify-center items-center focus:animate-ping transform hover:-translate-y-1 hover:scale-110 transition ease-in-out delay-150 bg-blue-700 text-white shadow-sm rounded-md"
          >
            <span> / </span>
          </button>
          <button
            onClick={() => handleUpdate("=")}
            className="h-10 w-10 flex justify-center items-center focus:animate-ping transform hover:-translate-y-1 hover:scale-110 transition ease-in-out delay-150 bg-blue-700 text-white shadow-sm rounded-md"
          >
            <span> = </span>
          </button>
          <button
            onClick={() => onsubmit()}
            className="h-10 w-16 flex justify-center items-center focus:animate-ping transform hover:-translate-y-1 hover:scale-110 transition ease-in-out delay-150 bg-blue-800 text-white shadow-sm rounded-md"
          >
            <span> enter </span>
          </button>
          <button
            onClick={() => handleremove("")}
            className="h-10 w-16 flex justify-center items-center focus:animate-ping transform hover:-translate-y-1 hover:scale-110 transition ease-in-out delay-150 bg-blue-800 text-white shadow-sm rounded-md"
          >
            <span> delete </span>
          </button>
        </div>
      </div>
      {how == true && (
        <div className="min-h-screen w-full absolute ">
          <div className="min-h-screen w-full flex flex-col justify-center items-center text-sm">
            <div className="w-1/2 flex bg-white opacity-100 p-10 flex-col items-center">
              <span className="pb-5 w-full flex justify-between">
                <span></span>
                <span>
                  How to play{" "}
                  <span className="text-red-500 underline">Nerdle</span>
                </span>
                <span
                  onClick={() => setHow(false)}
                  className="hover:cursor-pointer"
                >
                  x
                </span>
              </span>
              <span>
                Guess the nerdle in {ck} tries. After each guess, the color of
                the tiles will change to show how close your guess was to the
                solution.
              </span>
              <span className="font-bold underline py-4">Rules</span>
              <div className="flex flex-col">
                <span># Each guess is a calculation</span>
                <span># You can use 0 1 2 3 4 5 6 7 8 9 - + * / or =</span>
                <span># It must contain one "="</span>
                <span>
                  # It must only have a number to the right of the "=", not
                  another calculation
                </span>
                <span>
                  # Standard order of operations applies, so calculate * and /
                  before + and - eg. 3+2*5 = 13 not 25!
                </span>
              </div>
              <div className="flex space-x-2 text-white pt-5">
                <span className="h-8 w-8 flex justify-center items-center bg-lime-400">
                  1
                </span>
                <span className="h-8 w-8 flex justify-center items-center bg-gray-600">
                  1
                </span>
                <span className="h-8 w-8 flex justify-center items-center bg-gray-600">
                  +
                </span>
                <span className="h-8 w-8 flex justify-center items-center bg-gray-600">
                  3
                </span>
                <span className="h-8 w-8 flex justify-center items-center bg-gray-600">
                  {" "}
                  =
                </span>
                <span className="h-8 w-8 flex justify-center items-center bg-gray-600">
                  1
                </span>
                <span className="h-8 w-8 flex justify-center items-center bg-gray-600">
                  4
                </span>
              </div>
              <div>1 is in the solution and in the correct spot.</div>
              <div className="flex space-x-2 pt-5 text-white">
                <span className="h-8 w-8 flex justify-center items-center bg-gray-600">
                  1
                </span>
                <span className="h-8 w-8 flex justify-center items-center bg-gray-600">
                  1
                </span>
                <span className="h-8 w-8 flex justify-center items-center bg-red-400">
                  +
                </span>
                <span className="h-8 w-8 flex justify-center items-center bg-gray-600">
                  3
                </span>
                <span className="h-8 w-8 flex justify-center items-center bg-gray-600">
                  {" "}
                  =
                </span>
                <span className="h-8 w-8 flex justify-center items-center bg-gray-600">
                  1
                </span>
                <span className="h-8 w-8 flex justify-center items-center bg-gray-600">
                  4
                </span>
              </div>
              <div>+ is in the solution but in the wrong spot.</div>
              <div className="flex space-x-2 pt-5 text-white">
                <span className="h-8 w-8 flex justify-center items-center bg-gray-600">
                  1
                </span>
                <span className="h-8 w-8 flex justify-center items-center bg-gray-600">
                  1
                </span>
                <span className="h-8 w-8 flex justify-center items-center bg-gray-600">
                  +
                </span>
                <span className="h-8 w-8 flex justify-center items-center bg-gray-600">
                  3
                </span>
                <span className="h-8 w-8 flex justify-center items-center bg-gray-600">
                  {" "}
                  =
                </span>
                <span className="h-8 w-8 flex justify-center items-center bg-gray-600">
                  1
                </span>
                <span className="h-8 w-8 flex justify-center items-center bg-black">
                  4
                </span>
              </div>
              <div>4 is not in the solution in any spot</div>
              <div className="pt-5 text-center flex flex-col">
                <span>
                  If your guess includes, say, two 1s but the answer has only
                  one, you will get one color tile and one black
                </span>
                <span>
                  Tiles will only go green, if the number is in the correct
                  position.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
