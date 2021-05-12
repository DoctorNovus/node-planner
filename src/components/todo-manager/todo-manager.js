import { Component, html } from "@exalt/core";

import style from "./todo-manager.css";
import boot from "bootstrapcss";

import "../view-today";
import "../todo-item";

export class TodoManager extends Component {

    actives = super.reactive([]);
    inactives = super.reactive([]);

    render() {

        return html`
            <view-today total=${this.inactives.length + this.actives.length} todo=${this.actives.length} />
            <div class="list-group">
                ${this.actives.map((task, index) => html`<todo-item index=${index} item=${task} onfix=${(e)=>
                    this.swapItem(e.target, e.item)} ondelete=${(e) =>
                    this.deleteTask(e.target, e.item)} />`)}
            </div>
            <br>
            <div class="list-group">
                ${this.inactives.map((task, index) => html`<todo-item index=${index} item=${task} onfix=${(e)=>
                        this.swapItem(e.target, e.item)} ondelete=${(e) =>
                            this.deleteTask(e.target, e.item)} />`)}
            </div>
            <div id="addBox" class="invisible">
                <form onsubmit=${(e)=> this.createTask(e)}>
                    <label for="title">Task Title <span onclick=${()=> this.root.querySelector("#addBox").classList =
                            "invisible"}>X</span></label>
                    <input type="text" id="title" name="title" placeholder="Insert title here.." />
                    <label for="due">Due Date</label>
                    <input type="date" value="${new Date().toDateInputValue()}" id="due" name="due" />
                    <label for="info">Details</label>
                    <input id="info" name="info" type="text" placeholder="Insert task info here.." />
                    <label for="category">Category</label>
                    <input id="category" name="category" type="text" placeholder="Insert category here.." />
                    <button type="submit">Create</button>
                </form>
            </div>
            <footer>
                <h1 onclick=${()=> this.root.querySelector("#addBox").classList = ""}>+</h1>
            </footer>
        `;
    }

    createTask(e) {
        e.preventDefault();
        let objs = e.path[0].children;
        let obj = {
            id: (this.actives.length + this.inactives.length),
            title: objs.title.value,
            date: new Date(objs.due.value),
            info: objs.info.value,
            category: objs.category.value
        };

        let newArr = this.actives;
        newArr.push(obj);
        this.actives = newArr;

        this.root.querySelector("#addBox").classList = "invisible";
    }

    deleteTask(object, item) {
        let ite = this.actives.find(ite => ite.id == item.id);
        let ite2 = this.inactives.find(ite => ite.id == item.id);

        if (ite) {
            this.actives.splice(this.actives.findIndex(ite => ite.id == item.id), 1);
        }

        if (ite2) {
            this.inactives.splice(this.actives.findIndex(ite => ite.id == item.id), 1);
        }
    }

    mount() {
        this.actives = [
            { id: 0, title: "Tasks to do", date: new Date(), active: true, done: false, host: true },
            { id: 2, title: "9.4 Quiz", date: new Date(), info: "Quiz is found in Teams.", category: "Chemistry", done: false },
            { id: 3, title: "Chapter 15 Quiz", date: new Date(), info: "Quiz found in college portal.", category: "Math 122", done: false }
        ];

        this.inactives = [
            { id: 1, title: "Tasks finished", date: new Date(), active: true, done: true, host: true },
        ]
    }

    swapItem(object, item) {

        let ite = this.actives.find(ite => ite.id == item.id);
        let ite2 = this.inactives.find(ite => ite.id == item.id);

        if (ite) {
            let newItem = this.actives.splice(this.actives.findIndex(ite => ite.id == item.id), 1);
            newItem.done = !newItem.done;
            let newArr = this.inactives;
            newArr.push(newItem[0]);
            this.inactives = newArr.sort((a, b) => a.date.getTime() < b.date.getTime());
        } else if (ite2) {
            let newItem = this.inactives.splice(this.actives.findIndex(ite => ite.id == item.id), 1);
            newItem.done = !newItem.done;
            let newArr = this.actives;
            newArr.push(newItem[0]);
            this.actives = newArr.sort((a, b) => a.date.getTime() < b.date.getTime());
        }
    }
}

Date.prototype.toDateInputValue = (function () {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
});

Component.create({ name: "todo-manager", styles: [style, boot] }, TodoManager);