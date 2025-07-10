import { contrastRatio, passesWCAG } from "wcag-contrast-utils"

export const checkContrast = (textColor: string, backgroundColor: string) => {
	const ratio = contrastRatio(textColor, backgroundColor);

	return {
		wcagAA: ratio >= 4.5,
		wcagAALarge: ratio >= 3,
		wcagAAA: ratio >= 7,
		wcagAAALarge: ratio >= 4.5,
		ratio: ratio.toFixed(2),
		passes: passesWCAG(ratio)
	}
}