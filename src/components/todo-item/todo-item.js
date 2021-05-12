import { Component, html } from "@exalt/core";

import style from "./todo-item.css";
import boot from "bootstrapcss";

export class TodoItem extends Component {
    fix = new Event("fix");

    render({ item }) {
        let { title, date, info, forClass, count, active } = item;

        return html`
        <a class="list-group-item list-group-item-action ${active ? " active" : "" }" aria-current="true">
            <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">${title}</h5>
                ${count ? html`<span class="badge bg-primary rounded-pill">${count}</span>` :
                html`<small>${this.howManyDays(date)} days till due</small>`}
            </div>
            <p class="mb-1">${info}</p>
            <small>${forClass}</small>
        </a>
        `;
    }

    mount() {
        if (!this.props.item.host)
            this.root.querySelector("a").addEventListener("click", (e) => {
                this.fix.item = this.props.item;
                this.dispatchEvent(this.fix);
            });
    }

    howManyDays(date) {
        if (!date)
            date = new Date();

        let today = new Date();
        let day = today.getDay();

        return date.getDay() - day + 2;
    }
}

Component.create({ name: "todo-item", styles: [style, boot] }, TodoItem);