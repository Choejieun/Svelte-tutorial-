import "svelte/internal/disclose-version";
import "svelte/internal/flags/legacy";
import * as $ from "svelte/internal/client";

var root = $.template(`<button> </button> <p> </p>`, 1);

export default function App($$anchor, $$props) {
	$.push($$props, false);

	const doubled = $.mutable_state();
	let count = $.mutable_state(0);

	function handleClick() {
		$.set(count, $.get(count) + 1);
	}

	$.legacy_pre_effect(() => ($.get(count)), () => {
		if ($.get(count) >= 10) {
			alert('카운트가 10을 넘었습니다.');
			$.set(count, 9);
		}
	});

	$.legacy_pre_effect(() => ($.get(count)), () => {
		$.set(doubled, $.get(count) * 2);
	});

	$.legacy_pre_effect(() => ($.get(count), $.get(doubled)), () => {
		console.log($.get(count));
		console.log($.get(doubled));
	});

	$.legacy_pre_effect_reset();

	var fragment = root();
	var button = $.first_child(fragment);
	var text = $.child(button);

	$.reset(button);

	var p = $.sibling(button, 2);
	var text_1 = $.child(p);

	$.reset(p);

	$.template_effect(() => {
		$.set_text(text, `클릭수${$.get(count) ?? ""} ${($.get(count) >= 1 ? 'ㅇㅅㅇ' : 'times') ?? ""}`);
		$.set_text(text_1, `${$.get(count) ?? ""} 두배는 ${$.get(doubled) ?? ""}`);
	});

	$.event("click", button, handleClick);
	$.append($$anchor, fragment);
	$.pop();
}

{/* <script>
	let count = 0 ;
	$: doubled = count * 2

	$: if(count >= 10){
		alert('카운트가 10을 넘었습니다.')
		count = 9 
	}

	$: {
		console.log( count)
		console.log( doubled)
	}

	function handleClick() {
		count += 1
	}
	
</script>

<button on:click={handleClick}>
		클릭수{count} {count >= 1 ? 'ㅇㅅㅇ' : 'times'}
</button>

<p>{count} 두배는 {doubled} </p> */}