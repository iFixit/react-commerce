'use client';

import { useState } from 'react';

export default function Page() {
   //  const [port, setPort] = useState<any>(null);

   //  const showDevices = async () => {
   //     const port = await navigator.serial.requestPort();
   //     console.log(port.getInfo());
   //     try {
   //        await port.open({ baudRate: 9600 });
   //     } catch (e) {
   //        console.log(e);
   //     }
   //     setPort(port);
   //  };

   return (
      <div>
         <h1>FixHub</h1>
         <p>Welcome to the fix hub</p>
         <ArduinoConnector />
         {/* {port == null ? (
            <button onClick={showDevices}>Connect</button>
         ) : (
            <div>
               <p>Connected to device</p>
               <button>Toggle light</button>
            </div>
         )} */}
      </div>
   );
}

const VENDOR_ID = 0x2341;

// const ArduinoConnector = () => {
//    const [port, setPort] = useState(null);
//    const [writer, setWriter] =
//       useState<WritableStreamDefaultWriter<any> | null>(null);

//    const connectDevice = async () => {
//       try {
//          const newPort = await navigator.serial.requestPort({
//             filters: [{ usbVendorId: VENDOR_ID }],
//          });
//          await newPort.open({ baudRate: 9600 });

//          const newWriter = newPort.writable.getWriter();
//          setPort(newPort);
//          setWriter(newWriter);
//       } catch (error) {
//          console.error('Connection failed: ', error);
//       }
//    };

//    const toggleLed = async () => {
//       if (!writer) {
//          console.error('No device connected');
//          return;
//       }

//       const encoder = new TextEncoder();
//       const data = encoder.encode('toggle\n');
//       await writer.write(data);
//    };

//    const disconnectDevice = async () => {
//       if (writer) {
//          writer.releaseLock();
//       }

//       if (port) {
//          await port.close();
//          setPort(null);
//          setWriter(null);
//       }
//    };

//    return (
//       <div>
//          {port == null ? (
//             <button onClick={connectDevice}>Connect to Arduino</button>
//          ) : (
//             <div>
//                <button onClick={toggleLed} disabled={!port}>
//                   Toggle LED
//                </button>
//                <button onClick={disconnectDevice} disabled={!port}>
//                   Disconnect
//                </button>
//             </div>
//          )}
//       </div>
//    );
// };

const ArduinoConnector = () => {
   const [port, setPort] = useState(null);
   const [writer, setWriter] =
      useState<WritableStreamDefaultWriter<any> | null>(null);
   const [ledState, setLedState] = useState(false);

   const connectDevice = async () => {
      try {
         const newPort = await navigator.serial.requestPort({
            filters: [{ usbVendorId: VENDOR_ID }],
         });
         await newPort.open({ baudRate: 9600 });

         const newWriter = newPort.writable.getWriter();
         setPort(newPort);
         setWriter(newWriter);
      } catch (error) {
         console.error('Connection failed: ', error);
      }
   };

   const toggleLed = async () => {
      if (!writer) {
         console.error('No device connected');
         return;
      }

      // Toggle the LED state
      setLedState(!ledState);
      const data = new Uint8Array([ledState ? 0x02 : 0x01]); // 0x01 to turn on, 0x02 to turn off
      await writer.write(data);
   };

   const disconnectDevice = async () => {
      if (writer) {
         writer.releaseLock();
      }

      if (port) {
         await port.close();
         setPort(null);
         setWriter(null);
      }
   };

   return (
      <div>
         {port == null ? (
            <button onClick={connectDevice}>Connect to Arduino</button>
         ) : (
            <div>
               <button onClick={toggleLed} disabled={!port}>
                  {ledState ? 'Turn off' : 'Turn on'}
               </button>
               <button onClick={disconnectDevice} disabled={!port}>
                  Disconnect
               </button>
            </div>
         )}
      </div>
   );
   //  return (
   //     <div>
   //        <button onClick={connectDevice}>Connect to Arduino</button>
   //        <button onClick={toggleLed} disabled={!port}>
   //           Toggle LED
   //        </button>
   //        <button onClick={disconnectDevice} disabled={!port}>
   //           Disconnect
   //        </button>
   //     </div>
   //  );
};
