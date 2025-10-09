export function escapeHtml(input: string): string {
	return input
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;");
}

function serializeChildren(children: any[]): string {
	if (!Array.isArray(children)) return "";
	return children.map(serializeNode).join("");
}

function serializeText(node: any): string {
	const text = escapeHtml(String(node?.text ?? ""));
	// Lexical stores formatting in a bitmask `format`, but without tightly coupling to its values,
	// we keep text as-is for safety and simplicity. Extend here if needed.
	return text;
}

function serializeNode(node: any): string {
	if (!node || typeof node !== "object") return "";
	const type = node.type;

	switch (type) {
		case "root":
			return serializeChildren(node.children || []);
		case "paragraph":
			return `<p>${serializeChildren(node.children || [])}</p>`;
		case "heading": {
			const tag = node.tag || "h3";
			const safeTag = ["h1", "h2", "h3", "h4", "h5", "h6"].includes(tag)
				? tag
				: "h3";
			return `<${safeTag}>${serializeChildren(node.children || [])}</${safeTag}>`;
		}
		case "list": {
			const listType =
				node.listType === "number" || node.tag === "ol" ? "ol" : "ul";
			const children = serializeChildren(node.children || []);
			return `<${listType}>${children}</${listType}>`;
		}
		case "listitem":
			return `<li>${serializeChildren(node.children || [])}</li>`;
		case "quote":
			return `<blockquote>${serializeChildren(node.children || [])}</blockquote>`;
		case "linebreak":
			return "<br/>";
		case "link": {
			const url = String(node.url || node.href || "");
			const text = serializeChildren(node.children || []);
			if (!url) return text;
			const safe = escapeHtml(url);
			const rel = node.newTab ? ' rel="noopener noreferrer"' : "";
			const target = node.newTab ? ' target="_blank"' : "";
			return `<a href="${safe}"${rel}${target}>${text}</a>`;
		}
		case "text":
			return serializeText(node);
		default:
			return serializeChildren(node.children || []);
	}
}

export function lexicalToHTML(value: any): string {
	if (!value) return "";
	try {
		// Payload richText typically stores Lexical JSON under `root`
		const root = typeof value === "string" ? JSON.parse(value) : value;
		// Handle both the case of {root: {...}} and when value itself is the root
		const tree = root?.root?.type === "root" ? root.root : root;
		if (!tree || typeof tree !== "object") return "";
		return serializeNode(tree);
	} catch (_err) {
		return "";
	}
}
