<p align="center">
  <img src="https://user-images.githubusercontent.com/22475804/151048221-3ca00d76-feeb-478f-883a-8b8a6fbce6b4.png" height="200px" />
  <h1 align="center">React Native Layout Render</h1>
</p>

[![npm-version](https://img.shields.io/npm/v/react-native-layout-render?color=brightgreen&label=npm%20package)](https://www.npmjs.com/package/react-native-layout-render)

<br />

<p style="font-size: 18px" align="center">
Generate native interfaces based on declarations from JSON or YAML files
</p>

<br />

## Installation

```bash
yarn add react-native-layout-render
```

---

## Quick Start

### - Using YAML

```js
import RenderLayout from 'react-native-layout-render';

const yamlRenderExample = `
version: v1
root:
    type: View
    props:
      style:
        flex: 1
        paddingVertical: 100
        alignItems: center
    children:
      - type: Image
        props:
          style:
            width: 150
            aspectRatio: 0.6
          source:
            uri: "https://user-images.githubusercontent.com/22475804/151039878-d38a4131-4242-4a8b-ac11-d687dfd57abf.png"
      - type: Text
        props:
          style:
            fontSize: 20
            textAlign: center
            paddingVertical: 60
            fontWeight: bold
        children: "React Native Layout Render"
      - type: Text
        props:
          style:
            fontSize: 16
            textAlign: center
            padding: 10
            borderWidth: 1
            borderRadius: 10
        children: "yarn add react-native-layout-render"
`;

export default function App() {
    return <RenderLayout yamlText={yamlRenderExample} />;
}
```

---

### - Using JSON

```js
import RenderLayout from 'react-native-layout-render';

const jsonRenderExample = {
    version: 'v1',
    root: {
        type: 'View',
        props: {
            style: {
                flex: 1,
                paddingVertical: 100,
                alignItems: 'center',
            },
        },
        children: [
            {
                type: 'Image',
                props: {
                    style: {
                        width: 150,
                        aspectRatio: 0.6,
                    },
                    source: {
                        uri: 'https://user-images.githubusercontent.com/22475804/151039878-d38a4131-4242-4a8b-ac11-d687dfd57abf.png',
                    },
                },
            },
            {
                type: 'Text',
                props: {
                    style: {
                        fontSize: 20,
                        textAlign: 'center',
                        paddingVertical: 60,
                        fontWeight: 'bold',
                    },
                },
                children: 'React Native Layout Render',
            },
            {
                type: 'Text',
                props: {
                    style: {
                        fontSize: 16,
                        textAlign: 'center',
                        padding: 10,
                        borderWidth: 1,
                        borderRadius: 10,
                    },
                },
                children: 'yarn add react-native-layout-render',
            },
        ],
    },
};

export default function App() {
    return <RenderLayout jsonText={JSON.stringify(jsonRenderExample)} />;
}
```

### - Result in the APP

<img style="border-radius: 20px" src="https://user-images.githubusercontent.com/22475804/151043926-b0dc08d8-77c8-447c-891b-f76eb90f1de2.png" alt="alt text" width="300"/>

---

## Custom elements

### - Create Image with auto height

```js
import React, {useEffect, useState} from 'react';
import {Image} from 'react-native';
import {ICustomElementProps} from 'react-native-layout-render';

export default function ImageAutoHeight({props}: ICustomElementProps) {
    const [aspectRatio, setAspectRatio] = useState<number | undefined>();

    useEffect(() => {
        if (!props?.url) {
            return;
        }
        Image.prefetch(props.url)
            .then(() => {
                Image.getSize(props.url, (width, height) => {
                    const aspect = Math.round((width / height) * 100) / 100;
                    setAspectRatio(aspect);
                });
            })
            .catch(() => {});
    }, [props]);

    return <Image source={{uri: props.url}} {...props} style={[props?.style, {aspectRatio}]} />;
}
```

### - Create Button Link to other apps or websites

```js
import React from 'react';
import { Linking, TouchableOpacity } from 'react-native';
import { ICustomElementProps } from 'react-native-layout-render';

export default function Link({ props, children }: ICustomElementProps) {
    return (
        <TouchableOpacity {...props} onPress={() => goLink(props?.url)}>
            {children}
        </TouchableOpacity>
    );
}

async function goLink(url?: string) {
    if (url && typeof url === 'string') {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        }
    }
}
```

### - Using custom elements

```js
import RenderLayout, { setCustomElements } from 'react-native-layout-render';

import Link from './Link';
import ImageAutoHeight from './ImageAutoHeight';

setCustomElements({
    Link: (props, children) => Link({ props, children }),
    ImageAutoHeight: (props) => ImageAutoHeight({ props }),
});

const yamlRenderExample = `
version: v1
root:
    type: View
    props:
      style:
        flex: 1
        paddingVertical: 100
        alignItems: center
    children:
...
      - type: Link
        props:
          style:
            marginTop: 50
            padding: 10
            backgroundColor: "#F5F5F5"
            alignItems: center
            justifyContent: center
            borderRadius: 10
          url: "https://www.youtube.com"
        children:
          - type: Text
            props:
            style:
                fontSize: 20
                textAlign: center
                padding: 10
                borderWidth: 1
                borderRadius: 10
            children: "Open Youtube"
          - type: ImageAutoHeight
            props:
              style:
                marginTop: 15
                width: 180
              url: "https://user-images.githubusercontent.com/22475804/151046905-974b1029-1a4a-4264-a3b8-efa017e61cbb.png"
`;

export default function App() {
    return <RenderLayout yamlText={yamlRenderExample} />;
}
```

### - Result custom elements in the APP

<img style="border-radius: 20px" src="https://user-images.githubusercontent.com/22475804/151047335-de36beb5-27d6-4843-8ea7-04c5cd5613db.png" alt="alt text" width="300"/>
