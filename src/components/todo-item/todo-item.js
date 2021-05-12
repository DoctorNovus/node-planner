import { Component, html } from "@exalt/core";

import style from "./todo-item.css";
import boot from "bootstrapcss";

export class TodoItem extends Component {
    fix = new Event("fix");
    delete = new Event("delete");
    deleteCount = 0;

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
        if (!this.props.item.host) {
            this.root.querySelector("a").addEventListener("click", (e) => {
                this.fix.item = this.props.item;
                this.dispatchEvent(this.fix);
            });

            let that = this;

            this.root.querySelector("a").addEventListener('touchstart', (e) => this.handleTouchStart(that, e), false);
            this.root.querySelector("a").addEventListener('touchmove', (e) => this.handleTouchMove(that, e), false);

            this.xDown = null;
            this.yDown = null;
        }
    }

    howManyDays(date) {
        if (!date)
            date = new Date();

        let today = new Date();
        let day = today.getDay();

        return date.getDay() - day + 2;
    }

    getTouches(evt) {
        return evt.touches ||             // browser API
            evt.originalEvent.touches; // jQuery
    }

    handleTouchStart(that, evt) {
        const firstTouch = that.getTouches(evt)[0];
        that.xDown = firstTouch.clientX;
        that.yDown = firstTouch.clientY;
    };

    handleTouchMove(that, evt) {
        if (!that.xDown || !that.yDown) {
            return;
        }

        var xUp = evt.touches[0].clientX;
        var yUp = evt.touches[0].clientY;

        var xDiff = that.xDown - xUp;
        var yDiff = that.yDown - yUp;

        if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
            if (xDiff > 0) {
                this.deleteCount = 0;
                this.root.querySelector("a").style.backgroundColor = "white";
            } else {
                this.deleteCount++;
                this.root.querySelector("a").style.backgroundColor = "red";
                if (this.deleteCount == 2) {
                    this.delete.item = this.props.item;
                    this.dispatchEvent(this.delete);
                    this.deleteCount = 0;
                }
            }
        } else {
            if (yDiff > 0) {
                /* up swipe */
            } else {
                /* down swipe */
            }
        }
        /* reset values */
        that.xDown = null;
        that.yDown = null;
    };
}

Component.create({ name: "todo-item", styles: [style, boot] }, TodoItem);