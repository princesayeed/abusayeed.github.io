import { useRef, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/facemesh";
import Webcam from "react-webcam";

export default function Home() {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        const loadFacemeshModel = async () => {
            try {
                const model = await facemesh.load();
                console.log("Facemesh model loaded successfully.");

                // Do further processing with the model if needed.
            } catch (error) {
                console.error("Error loading facemesh model:", error);
            }
        };

        const initWebcam = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                });
                if (webcamRef.current) {
                    webcamRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error("Error accessing webcam:", error);
            }
        };

        loadFacemeshModel(); // Load facemesh model
        initWebcam(); // Initialize the webcam
    }, []);

    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>Face Detect</h1>
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    style={{
                        position: "absolute",
                        marginLeft: "auto",
                        marginRight: "auto",
                        left: 0,
                        right: 0,
                        textAlign: "center",
                        zIndex: 9,
                        width: 640,
                        height: 480,
                    }}
                />

                <canvas
                    ref={canvasRef}
                    style={{
                        position: "absolute",
                        marginLeft: "auto",
                        marginRight: "auto",
                        left: 0,
                        right: 0,
                        textAlign: "center",
                        zIndex: 9,
                        width: 640,
                        height: 480,
                    }}
                ></canvas>
            </main>

            <footer className={styles.description}>
                A webcam like Snapchat
            </footer>
        </div>
    );
}
