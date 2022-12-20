<script>
	import {myMoney, getMyMoneyUseDollar, getMyMoneyUseGet, getMyMoneyUseSubscribe, getMyMoneyUseDerived} from './Store.js';
	
	$myMoney = 10000;
	
	const money = getMyMoneyUseDollar();
	const money_get = getMyMoneyUseGet();
	const money_subscribe = getMyMoneyUseSubscribe();
	
</script>

<h1>SvelteのStoreにゃget()がある</h1>
<p>Hello {name}!</p>

<h2>
	このコンポーネント内でStoreを呼ぶ
</h2>
<p class="dekaimoji">
	I have {$myMoney}
</p>

<hr>

<h2>
	Store.js内で装飾したStoreを呼ぶ
</h2>
<h3>
	[getMyMoneyUseDoller()]
</h3>
<p class="dekaimoji">
	I have {money}
</p>

<h3>
	[getMyMoneyUseSubscribe()]
</h3>
<p class="dekaimoji">
	I have {money_subscribe}
</p>

<h3>
	[getMyMoneyUseGet()]
</h3>
<p class="dekaimoji">
	I have {money_get}
</p>
<h3>
	[$getMyMomeyUseDerived]
</h3>
<p class="dekaimoji">
		I have {$getMyMoneyUseDerived}
</p>

<hr>
<button on:click="{()=>{$myMoney += 1000}}">
	  Yes! money up
</button>

<style>
h3 {
		margin: 1em 0 0 0;
		color: #777;
}
.dekaimoji {
		margin: 0;
		font-size: 2em;
}
</style>
