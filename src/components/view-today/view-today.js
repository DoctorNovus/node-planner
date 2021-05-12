import { Component, html } from "@exalt/core";

import style from "./view-today.css";

import "../percent-tracker";

export class ViewToday extends Component {

    state = {
        time: new Date()
    }

    mount() {
        setInterval(() => {
            this.state.time = new Date();
        }, 1000 * 60);
    }

    render({todo, total}) {
        return html`
        <div class="today">
            <h1>${this.getDayName()}, ${this.getMonthName()} ${this.getDayInt()}</h1>
            <h2>${this.renderTime()}</h2>
        </div>
        <div class="percent-wrapper">
            <percent-tracker todo=${todo - 1} total=${total} onpercentchange=${(e)=> { this.root.querySelector("#percentText").innerText =
                e.todo == 0 ? "All tasks complete" : `${e.todo} tasks left to complete.` }} />
                <h1 id="percentText">${todo - 1 == 0 ? "All tasks complete" : `${todo - 1} tasks left to complete.`}</h1>
        </div>
        `;
    }

    getDayName() {
        let date = new Date();
        let days = [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
        ];

        return days[date.getUTCDay() - 1];
    }

    getDayInt() {
        let day = (new Date()).getUTCDate();
        return this.ordinal_suffix_of(day);
    }

    ordinal_suffix_of(i) {
        var j = i % 10,
            k = i % 100;
        if (j == 1 && k != 11) {
            return i + "st";
        }
        if (j == 2 && k != 12) {
            return i + "nd";
        }
        if (j == 3 && k != 13) {
            return i + "rd";
        }
        return i + "th";
    }

    getMonthName() {
        let months = [
            "January",
            "Febuary",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];

        return months[(new Date()).getUTCMonth()];
    }

    renderTime() {
        return html`${this.state.time.getHours()}:${this.state.time.getMinutes()}`;
    }
}

Component.create({ name: "view-today", styles: [style] }, ViewToday);