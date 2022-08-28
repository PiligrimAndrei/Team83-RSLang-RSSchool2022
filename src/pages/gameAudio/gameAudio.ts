import "./gameAudio.css";
import { AudioGameDescription } from "../../components/audioGameDescription/audioGameDescription";
import { AudioGameMain } from "../../components/audioGameMain/audioGameMain";
import { Component } from "../../components/components";
import { Link } from "../../components/link/link";

export class GameAudio extends Component {
  private AudioGameStartWrapper: Component;
  private AudioGameCloseLink: Link;
  private AudioGameWrapper: Component;
  constructor(parentNode: HTMLElement) {
    super(parentNode, "div", ["gameAudio"]);

    this.AudioGameCloseLink = new Link(
      this.element,
      "",
      ["AudioGameCloseLink"],
      ""
    );

    this.AudioGameStartWrapper = new AudioGameDescription(this.element);

    this.AudioGameWrapper = new AudioGameMain(this.element);
  }
}
