import { Component, html } from "@exalt/core";
import "./index.css";

import "./components/todo-manager";

export class App extends Component {

    render() {
        return html`
            <todo-manager />
        `;
    }
}

Component.create({ name: "app-root" }, App);