import {LIFFErrorObject} from "liff-type";
import {GetStaticProps, NextPage} from "next";
import Head from "next/head";
import {useCallback, useEffect, useState} from "react";

interface Props {
  hello: string;
}

const Index: NextPage<Props> = (props) => {
  const [logs, setLogs] = useState<string[]>([]);
  useEffect(() => {
    const didMount = async () => {
      setLogs(logs => [...logs, `Hello`]);

      const waitLiff = async () => {
        const timer = (millis: number) => new Promise(resolve => window.setTimeout(resolve, millis));
        while (!liff) {
          setLogs(logs => [...logs,
            `wait 1000ms`,
          ]);
          await timer(1000);
        }
      };

      setLogs(logs => [...logs,
        `loading the liff script`,
      ]);

      await waitLiff();

      setLogs(logs => [...logs,
        `location.href: ${location.href}`,
        `liff.ready: ${liff.ready}`,
        `liff.getOs: ${liff.getOS()}`,
        `liff.getLanguage: ${liff.getLanguage()}`,
        `liff.getVersion: ${liff.getVersion()}`,
        `liff.getLineVersion: ${liff.getLineVersion()}`,
        `liff.isInClient: ${liff.isInClient()}`,
      ]);

      try {
        await liff.init({
          liffId: "1655641715-DYEg7xbv",
        });
      } catch (e) {
        const error = e as LIFFErrorObject;
        setLogs(logs =>
          [...logs,
            `failed to execute the liff.init:`,
            `  code: ${error.code}`,
            `  message: ${error.message}`,
          ]);
        return;
      }

      if (!liff.isLoggedIn()) {
        setLogs(logs => [...logs,
          `loggedIn: false`
        ]);
        return;
      }

      setLogs(logs => [...logs,
        `liff.isLoggedIn: ${liff.isLoggedIn()}`,
        `liff.isApiAvailable(shareTargetPicker): ${liff.isApiAvailable('shareTargetPicker')}`,
        `liff.isApiAvailable(multipleLiffTransition): ${liff.isApiAvailable('multipleLiffTransition')}`,
        // error occurred if use unsupported name.
        // `liff.isApiAvailable(foo): ${liff.isApiAvailable('foo')}`,
        `liff.getAccessToken: ${liff.getAccessToken()}`,
        `liff.getIDToken: ${liff.getIDToken()}`,
      ]);

      const decodedIDToken = await liff.getDecodedIDToken();
      setLogs(logs => [...logs,
        `liff.getDecodedIDToken.amr: ${decodedIDToken.amr}`,
        `liff.getDecodedIDToken.aud: ${decodedIDToken.aud}`,
        `liff.getDecodedIDToken.email: ${decodedIDToken.email}`,
        `liff.getDecodedIDToken.exp: ${decodedIDToken.exp}`,
        `liff.getDecodedIDToken.iat: ${decodedIDToken.iat}`,
        `liff.getDecodedIDToken.iss: ${decodedIDToken.iss}`,
        `liff.getDecodedIDToken.name: ${decodedIDToken.name}`,
        `liff.getDecodedIDToken.picture: ${decodedIDToken.picture}`,
        `liff.getDecodedIDToken.sub: ${decodedIDToken.sub}`,
      ]);

      // the liff-type v4.1.3 missing the following field:
      // - accessTokenHash,
      // - availability
      // - endpointUrl
      // - permanentLinkPattern
      const context = liff.getContext();
      setLogs(logs =>
        [...logs,
          `liff.getContext.type: ${context.type}`,
          `liff.getContext.viewType: ${context.viewType}`,
          `liff.getContext.accessTokenHash: ${(context as any).accessTokenHash}`,
          `liff.getContext.userId: ${context.userId}`,
          `liff.getContext.utouId: ${context.utouId}`,
          `liff.getContext.groupId: ${context.groupId}`,
          `liff.getContext.roomId: ${context.roomId}`,
          `liff.getContext.availability.shareTargetPicker.permission: ${(context as any).availability.shareTargetPicker.permission}`,
          `liff.getContext.availability.shareTargetPicker.minVer: ${(context as any).availability.shareTargetPicker.minVer}`,
          `liff.getContext.availability.multipleLiffTransition.permission: ${(context as any).availability.multipleLiffTransition.permission}`,
          `liff.getContext.availability.multipleLiffTransition.minVer: ${(context as any).availability.multipleLiffTransition.minVer}`,
          `liff.getContext.endpointUrl: ${(context as any).endpointUrl}`,
          `liff.getContext.permanentLinkPattern: ${(context as any).permanentLinkPattern}`,
        ]);

      try {
        const profile = await liff.getProfile();
        setLogs(logs => [...logs,
          `liff.getProfile.userId: ${profile.userId}`,
          `liff.getProfile.displayName: ${profile.displayName}`,
          `liff.getProfile.pictureUrl: ${profile.pictureUrl}`,
          `liff.getProfile.statusMessage: ${profile.statusMessage}`,
        ]);
      } catch (e) {
        const error = e as LIFFErrorObject;
        setLogs(logs =>
          [...logs,
            `failed to execute the liff.getProfile:`,
            `  code: ${error.code}`,
            `  message: ${error.message}`,
          ]);
        // fallthrough.
      }

      try {
        const friendship = await liff.getFriendship();
        setLogs(logs => [...logs,
          `liff.getFriendship.friendFlag: ${friendship.friendFlag}`,
        ]);
      } catch (e) {
        const error = e as LIFFErrorObject;
        setLogs(logs =>
          [...logs,
            `failed to execute the liff.getFriendship:`,
            `  code: ${error.code}`,
            `  message: ${error.message}`,
          ]);
        // fallthrough.
      }

      try {
        setLogs(logs => [...logs,
          `liff.permanentLink.createUrl: ${(liff as any).permanentLink.createUrl()}`
        ]);
      } catch (e) {
        const error = e as LIFFErrorObject;
        setLogs(logs =>
          [...logs,
            `failed to execute the liff.permanentLink.createUrl:`,
            `  code: ${error.code}`,
            `  message: ${error.message}`,
          ]);
        // fallthrough.
      }
    };

    // noinspection JSIgnoredPromiseFromCall
    didMount();
    // eslint-disable-next-line
  }, []);

  const sendMessage = useCallback(async () => {
    try {
      await liff.sendMessages([{
        type: "text",
        text: `Hello ${new Date()}`,
      }]);
    } catch (e) {
      const error = e as LIFFErrorObject;
      setLogs(logs =>
        [...logs,
          `failed to execute the liff.sendMessages:`,
          `  code: ${error.code}`,
          `  message: ${error.message}`,
        ]);
      // fallthrough.
    }
  }, []);

  // noinspection CheckTagEmptyBody
  return <>
    <Head>
      <title>
        LIFF Sandbox
      </title>
    </Head>
    <button onClick={() => setLogs([])}>
      Clear log
    </button>
    <button onClick={sendMessage}>
      Send message
    </button>
    <button onClick={() => liff.closeWindow()}>
      Close
    </button>
    <button onClick={() => liff.login()}>
      Login
    </button>
    <p>
      {logs.map(data => data.replace(/^ {2}/, '\u00a0\u00a0')).map(data => <>{data}<br/></>)}
    </p>
    <script charSet="utf-8" src="https://static.line-scdn.net/liff/edge/2/sdk.js"></script>
  </>;
};

export const getStaticProps: GetStaticProps<Props> = async context => {
  return {
    props: {
      hello: "Hello",
    },
  };
};

export default Index;
