import path from "path";
import { fileURLToPath } from "url";

import Url from "../../url.js";
import Newspaper from "../../newspaper.js";

export default class Lider extends Newspaper {
	#__filename = fileURLToPath(import.meta.url);
	#__dirname = path.dirname(this.#__filename);
	#path = this.#__dirname;
	#state = "Aguascalientes";
	#name = "LÍDER";
	#baseUrl = "https://www.liderempresarial.com/";
	#url = new Url({
		base: `${this.#baseUrl}page/`,
		maxPages: 1974,
		end: "/?s",
	});
	scrapped = true;
	working = true;
	online = true;

	#preArticle_algortihms = {
		all_articles: (dom) =>
			[...dom.window.document.querySelectorAll("article")].length,
		title: (dom) =>
			[...dom.window.document.querySelectorAll("article > div > h3 > a")].map(
				(a) => a.textContent
			),
		url: (dom) =>
			[...dom.window.document.querySelectorAll("article > div > h3 > a")].map(
				(a) => a.getAttribute("href")
			),
		preview: (dom) =>
			[...dom.window.document.querySelectorAll("article > div > div > p")].map(
				(p) => p.textContent
			),
		date: (dom) =>
			[
				...dom.window.document.querySelectorAll(
					"article > div > div > div.jeg_meta_date > a"
				),
			].map((a) => a.textContent.trim()),
		author: (dom) =>
			[
				...dom.window.document.querySelectorAll(
					"article > div > div > div.jeg_meta_author > a"
				),
			].map((a) => a.textContent.trim()),
	};

	#article_algortihms = {
		title: (dom) =>
			[...dom.window.document.querySelectorAll("h1.jeg_post_title")].map(
				(a) => a.textContent
			),
		date: (dom) =>
			[
				...dom.window.document.querySelectorAll(
					"div.row > div > div > div > div.jeg_post_meta_1 > div.meta_left > div.jeg_meta_date > a"
				),
			].map((a) => a.textContent),
		author: (dom) =>
			[
				...dom.window.document.querySelectorAll(
					"div.row > div > div > div > div.jeg_post_meta_1 > div.meta_left > div.jeg_meta_author > a"
				),
			].map((a) => a.textContent.trim()),
		text: (dom) =>
			[
				...dom.window.document.querySelectorAll("h4, div.content-inner > p"),
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

//const lider = new Lider();

//console.log(await lider.prearticlesAll()());
//console.log(await lider.prearticlesTitles());
//console.log(await lider.prearticlesAuthors());
