# SvelteのStoreにゃget()がある

この記事は[Svelteのカレンダー | Advent Calendar 2022 - Qiita](https://qiita.com/advent-calendar/2022/svelte)の21日目となる投稿です。

**※注：これは、なぜかサンプルコードが付いてくる実録エッセイです。**

![REPL](https://raw.githubusercontent.com/hideki-masuoka/advent-2022-svelte/main/static/fig-00-repl.png)

## 概要

SvelteのStore機能にはgetという関数があってな...というお話をします。

SvelteはStoreという機能を使って、コンポーネント間で何かいい感じに値を活用できるという仕組みが用意されています。

例えば、Store.jsというファイルに下記のような感じでmyMoneyというStoreを定義すると、、、

```javascript
import {writable} from 'svelte/store';

export const myMoney = writable();
```

別のコンポーネント内では$接頭辞を付けて$myMoneyという形で呼び出して、リアクティブな状態で使用する事ができます。

```html
<h2>このコンポーネント内でStoreを呼ぶ</h2>
<p class="dekaimoji">
	I have {$myMoney}
</p>
```

![出力結果](https://raw.githubusercontent.com/hideki-masuoka/advent-2022-svelte/main/static/fig-01-incomponent.png)

## はぁ...修飾してぇ〜......

記事進行の都合上、ここらへんでいっちょmyMoneyを修飾した値を取得したくなりました。
  
$接頭辞とても便利！ Store.jsでmyMoneyを定義しつつ、修飾した値も返していくぞ！

```javascript
export const getMyMoneyUseDollar = () => {
	return $myMoney + suffix;
}
```

![おっと、これは機能しない](https://raw.githubusercontent.com/hideki-masuoka/advent-2022-svelte/main/static/fig-02-notdefined.png)

**なにィ！！！** ば、バカな......

## get()があるよ

この記事は12月21日公開予定の記事なのですが、現在、20日の午後23時53分を過ぎたところです。そういった事情も踏まえまして、全てを割愛して説明しますと、

「ここでは$接頭辞を付けてStoreを呼び出せないんじゃ。残念じゃったの...」

### どうにかする

どうにかしましょう。

### Case.1 subscribeする

Storeの持つ、本来の機能subscribeを使います。

```javascript
export const getMyMoneyUseSubscribe = () => {
	let money;
	myMoney.subscribe(value => { money = value });
	return money + suffix;
}
```

![subscribeした](https://raw.githubusercontent.com/hideki-masuoka/advent-2022-svelte/main/static/fig-03-subscribe.png)

ヨシ！

### Case.2 get（）する

というか、なんか、実はgetが用意されていました。 知らんかった...

```javascript
export const getMyMoneyUseGet = () => {
	return get(myMoney) + suffix;
}
```

![getした](https://raw.githubusercontent.com/hideki-masuoka/advent-2022-svelte/main/static/fig-04-get.png)

ヨシ！

### Case.3 derivedする

というか、なんか、実は今回の例のような場合では値げｔ^^v とかしなくても、derivedというStoreを派生させる機能が用意されていました。 知らんかった...

というか、なんか、本当は知っていたけどドキュメントを読んでも使いどころがピンときてなくて今回実際に試してみて初めて実感した驚きの「あっ、getあったけどgetせんでもええやんけ」でした。

```javascript
export const getMyMoneyUseDerived = derived(
  myMoney,
  $myMoney => { return $myMoney + suffix }
);
```

![実行結果](https://raw.githubusercontent.com/hideki-masuoka/advent-2022-svelte/main/static/fig-05-derived.webp)

やったぜ！！

## サンプルコード【REPL】

![REPL](https://raw.githubusercontent.com/hideki-masuoka/advent-2022-svelte/main/static/fig-00-repl.png)

[SvelteのStoreにゃget()がある • REPL • Svelte](https://svelte.dev/repl/63473afec7c94dafb4b1a23d22588611?version=3.55.0)


## まとめ

今回、Storeの値を直接ゲットしたいという湧き上がる衝動と、実はStoreにはget()が用意されていたという事実の発見により本稿に取り掛かりましたが、サンプルコードを書き進めていく過程で、ああ、get、ああ、、、となりました。  

Svelteには便利なREPLがあるので、もっと練習しましょう。 パッと練習できるし。 あと、REPLで書いたコードを保存して公開しておくとなんと実はググって検索できるし。 という結論になります。【完】

### 参考文献

> [svelte/store | Docs • Svelte](https://svelte.jp/docs#run-time-svelte-store)

> [Stores / Derived stores • Svelte Tutorial](https://svelte.jp/tutorial/derived-stores)

### Next

明日のSvelte Advent Calendar 2022は...<br>
[Svelteのカレンダー | Advent Calendar 2022 - Qiita](https://qiita.com/advent-calendar/2022/svelte)