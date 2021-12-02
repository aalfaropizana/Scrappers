import path from "path";
import { fileURLToPath } from "url";

import Url from "../../url.js";
import Newspaper from "../../newspaper.js";

export default class Centuria extends Newspaper {
	#__filename = fileURLToPath(import.meta.url);
	#__dirname = path.dirname(this.#__filename);
	#path = this.#__dirname;
	#state = "Aguascalientes";
	#name = "CENTURIA";
	#baseUrl = "http://www.centuria.mx/";
	#url = new Url({
		base: `${this.#baseUrl}page/`,
		maxPages: 1519,
		end: "/?s=",
	});
	scrapped = true;
	working = true;
	online = true;

	#preArticle_algortihms = {
		all_articles: (dom) =>
			[...dom.window.document.querySelectorAll("div.td_module_16")].length,
		title: (dom) =>
			[
				...dom.window.document.querySelectorAll(
					"div.td_module_16 > div.item-details > h3.entry-title > a"
				),
			].map((a) => a.textContent),
		url: (dom) =>
			[
				...dom.window.document.querySelectorAll(
					"div.td_module_16 > div.item-details > h3.entry-title > a"
				),
			].map((a) => a.getAttribute("href")),
		preview: (dom) =>
			[
				...dom.window.document.querySelectorAll(
					"div.td_module_16 > div.item-details > div.td-excerpt"
				),
			].map((div) => div.textContent.replaceAll("\n", "").trim()),
		date: (dom) =>
			[
				...dom.window.document.querySelectorAll(
					"div.td_module_16 > div.item-details > div.td-module-meta-info > span > time"
				),
			].map((time) => time.textContent),
		author: (dom) =>
			[
				...dom.window.document.querySelectorAll(
					"div.td_module_16 > div.item-details > div.td-module-meta-info > span > a"
				),
			].map((a) => a.textContent),
	};

	#article_algortihms = {
		title: (dom) =>
			[...dom.window.document.querySelectorAll("header > h1")].map(
				(a) => a.textContent
			),
		date: (dom) =>
			[
				...dom.window.document.querySelectorAll(
					"span.td-post-date > time.entry-date"
				),
			].map((a) => a.textContent),
		author: (dom) =>
			[
				...dom.window.document.querySelectorAll("div.td-post-author-name > a"),
			].map((a) => a.textContent.trim()),
		text: (dom) =>
			[...dom.window.document.querySelectorAll("div.td-post-content p")].map(
				(div) => div.textContent
			),
	};

	get path() {
		return this.#path;
	}
	get state() {
		return this.#state;
	}
	get name() {
		return this.#name;
	}
	get baseUrl() {
		return this.#baseUrl;
	}
	get url() {
		return this.#url;
	}
	get preArticle_algortihms() {
		return this.#preArticle_algortihms;
	}
	get article_algortihms() {
		return this.#article_algortihms;
	}

	_constructor(
		path,
		state,
		name,
		baseUrl,
		url,
		scrapped,
		working,
		online,
		preArticle_algortihms,
		article_algortihms
	) {}
}

//const centuria = new Centuria();

//console.log(await centuria.prearticlesAll()());
//console.log(await centuria.prearticlesTitles());
//console.log(await centuria.prearticlesAuthors());
