import path from "path";
import { fileURLToPath } from "url";

import Url from "../../url.js";
import Newspaper from "../../newspaper.js";

export default class LaJornadaAguascalientes extends Newspaper {
	#__filename = fileURLToPath(import.meta.url);
	#__dirname = path.dirname(this.#__filename);
	#path = this.#__dirname;
	#state = "Aguascalientes";
	#name = "LA JORNADA AGUASCALIENTES";
	#baseUrl = "https://www.lja.mx/";
	#url = new Url({
		base: `${this.#baseUrl}page/`,
		maxPages: 4660,
		end: "/?s",
	});
	scrapped = true;
	working = true;
	online = true;

	#preArticle_algortihms = {
		all_articles: (dom) =>
			[...dom.window.document.querySelectorAll("h3 > a")].length,
		title: (dom) =>
			[...dom.window.document.querySelectorAll("h3 > a")].map((a) =>
				a.textContent.replaceAll("\n", "").trim()
			),
		url: (dom) =>
			[...dom.window.document.querySelectorAll("h3 > a")].map((a) =>
				a.getAttribute("href")
			),
		preview: (dom) =>
			[
				...dom.window.document.querySelectorAll("div.vw-post-box-excerpt > p"),
			].map((div) => div.textContent),
		date: (dom) =>
			[...dom.window.document.querySelectorAll("div.vw-post-box-meta > a")].map(
				(a) => a.textContent.replaceAll("\n", "").trim()
			),
	};

	#article_algortihms = {
		title: (dom) =>
			[...dom.window.document.querySelectorAll("h1.page-title")].map(
				(a) => a.textContent
			),
		date: (dom) =>
			[
				...dom.window.document.querySelectorAll(
					"div.vw-post-meta__item > time.vw-post-date"
				),
			].map((a) => a.textContent.replaceAll("\n", "").trim()),
		author: (dom) =>
			[
				...dom.window.document.querySelectorAll(
					"div.vw-post-meta__item > a.vw-post-author"
				),
			].map((a) => a.textContent.trim()),
		text: (dom) =>
			[...dom.window.document.querySelectorAll("div.vw-post-content > p")].map(
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

//const laJornadaAguascalientes = new LaJornadaAguascalientes();

//console.log(await laJornadaAguascalientes.prearticlesAll()());
//console.log(await laJornadaAguascalientes.prearticlesTitles());
//console.log(await laJornadaAguascalientes.prearticlesAuthors());
