
interface IScreenShotOptions {
  width: number;
  height: number;
  x: number;
  y: number;
}

/*
这段代码是使用 Chrome 扩展的 Chrome Extension API 中的 chrome.runtime.sendMessage 方法来发送消息。
在这里，消息的目的是请求执行一个动作，具体动作是 BACKGROUND_EVENTS.SCREEN_SHOT。
这个消息是一个包含 action 属性的对象，该属性的值是一个指定的事件常量，可能是在扩展的后台脚本中定义的。

具体地说，这段代码的作用是告诉后台脚本执行屏幕截图操作。当后台脚本收到这个消息时，
可能会执行与屏幕截图有关的逻辑。
在这段代码中，回调函数（base64 => {...}）留空，这意味着在收到屏幕截图后不执行任何特定的逻辑。
通常，你会在回调函数中定义对收到的数据的处理逻辑。
*/
export async function screenShot(options: IScreenShotOptions): Promise<HTMLCanvasElement> {
  return new Promise((resolve, rejected) => {
    /*
    Chrome.runtime.sendMessage(
      {
        action: BACKGROUND_EVENTS.SCREEN_SHOT,
      },
      base64 => {
        try {
          const image = new Image();
          image.src = base64;
          image.onload = () => {
            const imageWidthRatio = image.width / window.innerWidth;
            const imageHeightRatio = image.height / window.innerHeight;
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');

            // 设置截取区域的坐标和宽高
            const x = options.x * imageWidthRatio; // 区域的左上角x坐标
            const y = options.y * imageHeightRatio; // 区域的左上角y坐标
            const width = options.width * imageWidthRatio; // 区域的宽度
            const height = options.height * imageHeightRatio; // 区域的高度
            // 在canvas上绘制截取区域
            canvas.width = width;
            canvas.height = height;
            context?.drawImage(image, x, y, width, height, 0, 0, width, height);
            resolve(canvas);
          };
        } catch (error) {
          rejected(error);
        }
      },
    );
    */
  });
}
