import { Component, html } from "@exalt/core";

import style from "./todo-item.css";
import boot from "bootstrapcss";

export class TodoItem extends Component {
    fix = new Event("fix");
    delete = new Event("delete");
    deleteCount = 0;
    recordedTime = (new Date).getTime();

    render({ item }) {
        let { title, date, info, forClass, count, active } = item;

        return html`
        <a class="list-group-item list-group-item-action ${active ? " active" : ""}" aria-current="true">
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

            this.root.querySelector("a").addEventListener("touchstart", function (a) {
                50 < (new Date).getTime() - that.recordedTime && (that.xPrimary = parseInt(a.changedTouches[0].pageX, 10), that.yPrimary = parseInt(a.changedTouches[0].pageY, 10), that.recordedTime = (new Date).getTime());
            }, !1);

            this.root.querySelector("a").addEventListener("touchend", function (a) {
                that.xSecondary = that.xPrimary;
                that.ySecondary = that.yPrimary;

                that.xPrimary = parseInt(a.changedTouches[0].pageX, 10);
                that.yPrimary = parseInt(a.changedTouches[0].pageY, 10);

                if (that.dir() == "left") {
                    that.deleteCount = 0;
                    that.root.querySelector("a").style.backgroundColor = "white";
                } else if(that.dir() == "right") {
                    that.deleteCount++;
                    that.root.querySelector("a").style.backgroundColor = "red";
                    if (that.deleteCount == 2) {
                        that.delete.item = that.props.item;
                        that.dispatchEvent(that.delete);
                        that.deleteCount = 0;
                    }
                }

                that.recordedTime = (new Date).getTime();
            }, !1);

            this.root.querySelector("a").addEventListener("mousedown", function (a) {
                50 < (new Date).getTime() - that.recordedTime && (that.xPrimary = a.clientX, that.yPrimary = a.clientY, that.recordedTime = (new Date).getTime());
            }, !1);

            this.root.querySelector("a").addEventListener("mouseup", function (a) {
                that.xSecondary = that.xPrimary;
                that.ySecondary = that.yPrimary;
                
                that.xPrimary = a.clientX;
                that.yPrimary = a.clientY;

                if (that.dir() == "left") {
                    that.deleteCount = 0;
                    that.root.querySelector("a").style.backgroundColor = "white";
                } else if(that.dir() == "right") {
                    that.deleteCount++;
                    that.root.querySelector("a").style.backgroundColor = "red";
                    if (that.deleteCount == 2) {
                        that.delete.item = that.props.item;
                        that.dispatchEvent(that.delete);
                        that.deleteCount = 0;
                    }
                }

                that.recordedTime = (new Date).getTime();
            }, !1);

            this.xPrimary = null;
            this.yPrimary = null;
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

    handleMouseDown(that, evt) {
        50 < (new Date).getTime() - recordedTime && (that.xPrimary = evt.clientX, that.yPrimary = evt.clientY, recordedTime = (new Date).getTime());
    }

    dir() {
        let a = this.xPrimary - this.xSecondary;
        let b = this.yPrimary - this.ySecondary;
        if (!(parseInt(Math.sqrt(a * a + b * b), 10) < 15)) {
            if (this.xSecondary - this.xPrimary > Math.abs(this.yPrimary - this.ySecondary)) {
                return "left";
            }
            if (this.xPrimary - this.xSecondary > Math.abs(this.yPrimary - this.ySecondary)) {
                return "right";
            }
            if (this.ySecondary - this.this.yPrimary > Math.abs(this.xPrimary - this.xSecondary)) {
                return "up";
            }
            if (this.yPrimary - this.ySecondary > Math.abs(this.xPrimary - this.xSecondary)) {
                return "down";
            }
        } else {
            return "none";
        }
    }

    handleMouseMove(that, evt) {
        document.documentElement.addEventListener("touchstart", function (a) {
            50 < (new Date).getTime() - recordedTime && (x = parseInt(a.changedTouches[0].pageX, 10), y = parseInt(a.changedTouches[0].pageY, 10), recordedTime = (new Date).getTime());
        }, !1);
        document.documentElement.addEventListener("touchend", function (a) {
            x1 = x;
            y1 = y;
            x = parseInt(a.changedTouches[0].pageX, 10);
            y = parseInt(a.changedTouches[0].pageY, 10);
            document.getElementById("direction").innerHTML = dir();
            recordedTime = (new Date).getTime();
        }, !1);
        document.documentElement.addEventListener("mousedown", function (a) {
            50 < (new Date).getTime() - recordedTime && (x = a.clientX, y = a.clientY, recordedTime = (new Date).getTime());
        }, !1);
        document.documentElement.addEventListener("mouseup", function (a) {
            x1 = x;
            y1 = y;
            x = a.clientX;
            y = a.clientY;
            document.getElementById("direction").innerHTML = dir();
            recordedTime = (new Date).getTime();
        }, !1);
        document.documentElement.style.userSelect = "none";
    }

    handleTouchStart(that, evt) {
        const firstTouch = that.getTouches(evt)[0];
        that.xPrimary = firstTouch.clientX;
        that.yPrimary = firstTouch.clientY;
    };

    handleTouchMove(that, evt) {
        if (!that.xPrimary || !that.yPrimary) {
            return;
        }

        var xUp = evt.touches[0].clientX;
        var yUp = evt.touches[0].clientY;

        var xDiff = that.xPrimary - xUp;
        var yDiff = that.yPrimary - yUp;

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
        that.xPrimary = null;
        that.yPrimary = null;
    };
}

Component.create({ name: "todo-item", styles: [style, boot] }, TodoItem);