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
                ${this.actives.sort((a, b) => a.title > b.title).map((task, index) => html`<todo-item index=${index} item=${task} onfix=${(e) => this.swapItem(e.target, e.item)} />`)}
            </div>
            <br>
            <div class="list-group">
                ${this.inactives.sort((a, b) => a.title > b.title).map((task, index) => html`<todo-item index=${index} item=${task} onfix=${(e) => this.swapItem(e.target, e.item)} />`)}
            </div>
        `;
    }

    mount() {
        this.actives = [
            { id: 0, title: "Tasks to do", date: new Date(), active: true, done: false, host: true },
            { id: 1, title: "9.4 Quiz", date: new Date(), info: "Quiz is found in Teams.", forClass: "Chemistry", done: false },
            { id: 2, title: "Chapter 15 Quiz", date: new Date(), info: "Quiz found in college portal.", forClass: "Math 122", done: false }
        ];

        this.inactives = [
            { id: 0, title: "Tasks finished", date: new Date(), active: true, done: true, host: true },
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
            this.inactives = newArr.sort((a, b) => a.title > b.title);
        } else if (ite2) {
            let newItem = this.inactives.splice(this.actives.findIndex(ite => ite.id == item.id), 1);
            newItem.done = !newItem.done;
            let newArr = this.actives;
            newArr.push(newItem[0]);
            this.actives = newArr.sort((a, b) => a.title > b.title);
        }
    }
}

Component.create({ name: "todo-manager", styles: [style, boot] }, TodoManager);