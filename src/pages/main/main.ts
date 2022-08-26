import { Component } from "../../components/components";
import { MainPageDescription } from "../../components/mainPageDescription/mainPageDescription";
import { MainPageAdvantages } from "../../components/mainPageAdvantages/mainPageAdvantages";
import { MainPageDevelopers } from "../../components/mainPageDevelopers/mainPageDevelopers";

export class Main extends Component {
  private mainPageDescription: MainPageDescription;
  private mainPageAdvantages: MainPageAdvantages;
  private mainPageDevelopers: MainPageDevelopers;
  constructor(parentNode: HTMLElement) {
    super(parentNode, "div", ["main"]);

    this.mainPageDescription = new MainPageDescription(this.element);
    this.mainPageAdvantages = new MainPageAdvantages(this.element);
    this.mainPageDevelopers = new MainPageDevelopers(this.element);
  }
}