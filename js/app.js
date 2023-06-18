// alert(1111);

//jQueryを使うときのルール htmlに目印をつけること！
// $("").on("click", function () {});

class TodoList {
    constructor() {
        this.DOM = {};
        this.DOM.incomplete = document.querySelector(".item-area-incomplete ul");
        this.DOM.complete = document.querySelector(".item-area-complete ul");
    }

    _createItem(text) {
        const liElm = document.createElement("li");
        const pElm = document.createElement("p");
        const deleteButton = document.createElement("button");
        const completeButton = document.createElement("button");

        completeButton.classList.add("complete-button");
        completeButton.innerText = "完了";
        deleteButton.classList.add("incomplete-button");
        deleteButton.innerText = "削除";
        pElm.innerText = text;

        completeButton.addEventListener("click", () => {
        this.deleteItem(liElm, this.DOM.incomplete);
        this.addCompleteItem(text);
        this.saveToLocalStorage();
    });

    deleteButton.addEventListener("click", () => {
        const confirmation = confirm("タスクを削除しても良いですか？");

        if (confirmation) {
            this.deleteItem(liElm, this.DOM.incomplete);
            this.saveToLocalStorage();
        }
    });
    
    liElm.appendChild(pElm);
    liElm.appendChild(completeButton);
    liElm.appendChild(deleteButton);
    
    return liElm;
    }

    _completeItem(text) {
        const liElm = document.createElement("li");
        const pElm = document.createElement("p");
        const backButton = document.createElement("button");

        backButton.classList.add("complete-button");
        backButton.innerText = "戻る";
        pElm.innerText = text;

        backButton.addEventListener("click", () => {
        this.deleteItem(liElm, this.DOM.complete);
        this.addItem(text);
        this.saveToLocalStorage();
    });

    liElm.appendChild(pElm);
    liElm.appendChild(backButton);

    return liElm;
    }

    addItem(text) {
        this.DOM.incomplete.appendChild(this._createItem(text));
        this.saveToLocalStorage();
    }

    addCompleteItem(text) {
        this.DOM.complete.appendChild(this._completeItem(text));
        this.saveToLocalStorage();
    }

    deleteItem(target, domparent) {
        domparent.removeChild(target);
        this.saveToLocalStorage();
    }

    saveToLocalStorage() {
        const incompleteItems = Array.from(this.DOM.incomplete.children).map(
        (item) => item.querySelector("p").innerText
        );
        const completeItems = Array.from(this.DOM.complete.children).map(
        (item) => item.querySelector("p").innerText
        );

    localStorage.setItem(
        "todoList",
        JSON.stringify({
            incomplete: incompleteItems,
            complete: completeItems,
        })
    );
    }

    loadFromLocalStorage() {
        const todoListData = localStorage.getItem("todoList");
        
        if (todoListData) {
        const { incomplete, complete } = JSON.parse(todoListData);

        incomplete.forEach((item) => {
            this.addItem(item);
        });
        
        complete.forEach((item) => {
            this.addCompleteItem(item);
        });
    }
    }
    }
    
    function addTodoEvent() {
        const addItemTxt = document.querySelector(".add-item").value;
        if (addItemTxt == "") {
            alert("値を入力してください");
            return;}
            document.querySelector(".add-item").value = "";
            const totoList = new TodoList();
            totoList.addItem(addItemTxt);
        }
        
        document.querySelector(".add-button").addEventListener("click", addTodoEvent);
        document.addEventListener
