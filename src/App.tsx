import { useMemo, useState } from "react";
import { checkContrast } from "./lib/wcag";

function App() {
	const [textColor, setTextColor] = useState('#000000');
	const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
	const [result, setResult] = useState({
		wcagAA: false,
		wcagAALarge: false,
		wcagAAA: false,
		wcagAAALarge: false,
		ratio: '0.00',
		passes: "Nothing",
	});

	useMemo(() => {
		const contrast = checkContrast(textColor, backgroundColor);
		setResult(contrast);
	}, [textColor, backgroundColor])

	const handleTextColorChange = () => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const eyedropper = new (window as any).EyeDropper();

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		eyedropper.open().then((result: any) => {
			setTextColor(result.sRGBHex);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		}).catch((error: any) => {
			console.error("Error picking text color:", error);
		});
	};

	const handleBackgroundColorChange = () => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const eyedropper = new (window as any).EyeDropper();

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		eyedropper.open().then((result: any) => {
			setBackgroundColor(result.sRGBHex);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		}).catch((error: any) => {
			console.error("Error picking background color:", error);
		});
	};

	return (
		<main
			className="w-128 mx-auto flex flex-col items-center justify-center min-h-screen"
		>
			<div
				style={{
					backgroundColor: backgroundColor,
					color: textColor,
				}}
				className="w-full h-48 p-4 rounded text-center flex flex-col items-center justify-center"
			>
				<p
					className="text-[28px]"
				>
					Lorem ipsum dolor sit, amet consectetur adipisicing elit.
				</p>
			</div>

			<div className="grid grid-cols-2 mt-4 gap-4 w-full">
				<button
					onClick={handleTextColorChange}
					className="flex flex-row items-center justify-center gap-2 p-2 border-stone-500 border rounded hover:bg-stone-700 transition-colors"
				>
					<div className="w-4 h-4 rounded" style={{ backgroundColor: textColor }}></div>
					Pick Text Color
				</button>
				<button 
					onClick={handleBackgroundColorChange}
					className="flex flex-row items-center justify-center gap-2 p-2 border-stone-500 border rounded hover:bg-stone-700 transition-colors"
				>
					<div className="w-4 h-4 rounded" style={{ backgroundColor: backgroundColor }}></div>
					Pick Background Color
				</button>
			</div>

			<div className={`
				${result.wcagAA && result.wcagAALarge && result.wcagAAA && result.wcagAAALarge ? "bg-green-500/5" : "bg-red-500/5"}
				border-stone-500 border rounded mt-4 p-4 w-full
			`}>
				<h2 className="text-lg font-bold mb-2">Contrast Results</h2>
				<ul className="list-disc pl-5">
					<li className={result.wcagAA ? "text-green-500" : "text-red-500"}>
						WCAG AA: {result.wcagAA ? "Pass" : "Fail"}
					</li>
					<li className={result.wcagAALarge ? "text-green-500" : "text-red-500"}>
						WCAG AA Large: {result.wcagAALarge ? "Pass" : "Fail"}
					</li>
					<li className={result.wcagAAA ? "text-green-500" : "text-red-500"}>
						WCAG AAA: {result.wcagAAA ? "Pass" : "Fail"}
					</li>
					<li className={result.wcagAAALarge ? "text-green-500" : "text-red-500"}>
						WCAG AAA Large: {result.wcagAAALarge ? "Pass" : "Fail"}
					</li>
					<li>
						Contrast Ratio: <span className="font-bold">{result.ratio}</span>
					</li>
					<li>
						Passes WCAG: <span className="font-bold">{result.passes}</span>
					</li>
				</ul>
			</div>
		</main>
  	)
}

export default App;