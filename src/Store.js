import {writable, get, derived} from 'svelte/store';

export const myMoney = writable();

const suffix = '円';

export const getMyMoneyUseDollar = () => {
	  // これは機能しない
	  // return $myMoney + suffix;
	  return 'no, You have not money.';
}

export const getMyMoneyUseGet = () => {
	  return get(myMoney) + suffix;
}

export const getMyMoneyUseSubscribe = () => {
	  let money;
	  myMoney.subscribe(value => { money = value });
	  return money + suffix;
}

export const getMyMoneyUseDerived = derived(myMoney, $myMoney => { return $myMoney + suffix });
