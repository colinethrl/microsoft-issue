import { Browser } from "@capacitor/browser";
import { SplashScreen } from "@capacitor/splash-screen";
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';

window.customElements.define(
  "capacitor-welcome",
  class extends HTMLElement {
    constructor() {
      super();

      SplashScreen.hide();

      const root = this.attachShadow({ mode: "open" });
      root.innerHTML = `
    <main>
      <h1>Capacitor App</h1>
      <button id="connect-microsoft" (click)="connectWithMicrosoft()">Microsoft</button>
    </main>
    `;
    }

    


    async connectWithMicrosoft() {
      const result = await FirebaseAuthentication.signInWithMicrosoft();
      const provider = new OAuthProvider('microsoft.com');
      const credentials = provider.credential({
        idToken: result.credential?.idToken,
        accessToken: result.credential?.accessToken,
        rawNonce: result.credential?.nonce
      });
      console.log("credentials", credentials)
  
      const auth = getAuth();
      console.log("auth", auth)
    }

    connectedCallback() {
      const self = this;

      self.shadowRoot
        .querySelector("#connect-microsoft")
        .addEventListener("click", async (event) => {
          this.connectWithMicrosoft();
        });
    }
  },
);
