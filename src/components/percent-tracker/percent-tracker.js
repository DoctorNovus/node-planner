import { Component, html } from "@exalt/core";

import style from "./percent-tracker.css";

export class PercentTracker extends Component {
    opc = new Event("percentchange");

    title = "TITLE";
    radio = 100;
    swidth = 4;
    scolor = "#cb2240";
    _dasharray = "" + Math.PI * this.radio * this.percent / 100 + " " + Math.PI * this.radio;

    render({ todo, total }) {
        this.percent = Math.floor((total - todo) / total * 100);
        this._dasharray = "" + Math.PI * this.radio * this.percent / 100 + " " + Math.PI * this.radio;

        this.opc.todo = todo;
        this.opc.total = total;

        this.dispatchEvent(this.opc);

        return html`
        <div class="circle-inf">
            <div class="circle-inf__percent">
                <div class="circle-inf__percent-circle">
                    <svg width="${this.radio + this.swidth}" height="${this.radio + this.swidth}"
                        viewBox="0 ${-this.swidth / 2} ${this.radio} ${this.radio + this.swidth}">
                        <circle cx="${this.radio / 2}" cy="${this.radio / 2}" r="${this.radio / 2}" stroke="${this.scolor}"
                            fill="none" stroke-width="${this.swidth}" stroke-dasharray="${this._dasharray}" />
                    </svg>
                </div>
                <div class="circle-inf__percent-txt">
                    ${this.percent}%
                </div>
            </div>
        </div>
        `;
    }
}

Component.create({ name: "percent-tracker", styles: [style] }, PercentTracker);