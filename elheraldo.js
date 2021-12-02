import path from "path";
import { fileURLToPath } from "url";

import Url from "../../url.js";
import Newspaper from "../../newspaper.js";

export default class ElHeraldo extends Newspaper {
	#__filename = fileURLToPath(import.meta.url);
	#__dirname = path.dirname(this.#__filename);
	#path = this.#__dirname;
	#state = "Aguascalientes";
	#name = "EL HERALDO";
	#baseUrl = "http://www.heraldo.mx/";
	#url = new Url({
		base: `${this.#baseUrl}page/`,
		maxPages: 6823,
		end: "/?s",
	});
	scrapped = true;
	working = true;
	online = true;

	#preArticle_algortihms = {
		all_articles: (dom) =>
			[...dom.window.document.querySelectorAll("h3 > a")].length,
		title: (dom) =>
			[...dom.window.document.querySelectorAll("h3 > a")].map(
				(a) => a.textContent
			),
		url: (dom) =>
			[...dom.window.document.querySelectorAll("h3 > a")].map((a) =>
				a.getAttribute("href")
			),
	};

	#article_algortihms = {
		title: (dom) =>
			[...dom.window.document.querySelectorAll("h1 > span")].map(
				(a) => a.textContent
			),
		date: (dom) =>
			[
				...dom.window.document.querySelectorAll(
					"div.btSubTitle > span.btArticleDate"
				),
			].map((a) => a.textContent),
		author: (dom) =>
			[
				...dom.window.document.querySelectorAll(
					"div.btSubTitle > a.btArticleAuthor"
				),
			].map((a) => a.textContent.trim()),
		text: (dom) =>
			[
				...dom.window.document.querySelectorAll(
					"div.btArticleExcerpt, div.btArticleBody > div.bt_bb_wrapper > p"
				),
			].map((div) => div.textContent),
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

//const elHeraldo = new ElHeraldo();

//console.log(await elHeraldo.prearticlesAll()());
//console.log(await elHeraldo.prearticlesTitles());
//console.log(await elHeraldo.prearticlesAuthors());
