(function () {
  'use strict';
  const $ = id => document.getElementById(id);

  /* ===================== 共通：手順を全部作ってから見せる ===================== */
  /* frame = { arr, i, j, min, line, cmp:[..], swap:[..], done:[..], msg } */

  function bubbleFrames(src) {
    const a = src.slice(), n = a.length, fr = [];
    const ids = a.map((_, k) => k);          /* 値についたまま動く「札」の番号 */
    let cmp = 0, swp = 0;
    const done = [];
    const snap = (o) => { o.arr = a.slice(); o.ids = ids.slice(); return o; };
    fr.push(snap({ i: null, j: null, line: 1, cmp: [], swap: [], done: [], c: 0, s: 0,
      msg: '配列を用意しました。ここから始めます。' }));
    fr.push(snap({ i: null, j: null, line: 2, cmp: [], swap: [], done: [], c: 0, s: 0,
      msg: '要素数 n ＝ <strong>' + n + '</strong> を求めました。' }));
    for (let i = 0; i <= n - 2; i++) {
      fr.push(snap({ i: i, j: null, line: 3, cmp: [], swap: [], done: done.slice(), c: cmp, s: swp,
        msg: '<strong>' + (i + 1) + '周目</strong>（i ＝ ' + i + '）。ここから右端の2つに向かって比べていきます。' }));
      for (let j = n - 2; j >= i; j--) {
        cmp++;
        fr.push(snap({ i: i, j: j, line: 5, cmp: [j, j + 1], swap: [], done: done.slice(), c: cmp, s: swp,
          msg: 'Data[' + j + ']＝' + a[j] + ' と Data[' + (j + 1) + ']＝' + a[j + 1] + ' を比べます。' }));
        if (a[j] > a[j + 1]) {
          swp++;
          const t = a[j]; a[j] = a[j + 1]; a[j + 1] = t;
          const u = ids[j]; ids[j] = ids[j + 1]; ids[j + 1] = u;
          fr.push(snap({ i: i, j: j, line: 6, cmp: [], swap: [j, j + 1], done: done.slice(), c: cmp, s: swp,
            msg: '左のほうが大きいので<strong>入れかえます</strong>。hozon を使って3行で入れかえるのがポイント。' }));
        } else {
          fr.push(snap({ i: i, j: j, line: 5, cmp: [j, j + 1], swap: [], done: done.slice(), c: cmp, s: swp,
            msg: '左のほうが小さい（または同じ）ので、そのままにします。' }));
        }
      }
      done.push(i);
      fr.push(snap({ i: i, j: null, line: 3, cmp: [], swap: [], done: done.slice(), c: cmp, s: swp,
        msg: '<strong>Data[' + i + ']＝' + a[i] + ' が確定</strong>しました。いちばん小さいものが左に集まっていきます。' }));
    }
    done.push(n - 1);
    fr.push(snap({ i: null, j: null, line: 9, cmp: [], swap: [], done: done.slice(), c: cmp, s: swp,
      msg: '<strong>並びかえ完了。</strong>比較 ' + cmp + ' 回、交換 ' + swp + ' 回でした。' }));
    return fr;
  }

  function selectionFrames(src) {
    const a = src.slice(), n = a.length, fr = [];
    const ids = a.map((_, k) => k);
    let cmp = 0, swp = 0;
    const done = [];
    const snap = (o) => { o.arr = a.slice(); o.ids = ids.slice(); return o; };
    fr.push(snap({ i: null, j: null, min: null, line: 1, cmp: [], swap: [], done: [], c: 0, s: 0,
      msg: '配列を用意しました。ここから始めます。' }));
    fr.push(snap({ i: null, j: null, min: null, line: 2, cmp: [], swap: [], done: [], c: 0, s: 0,
      msg: '要素数 n ＝ <strong>' + n + '</strong> を求めました。' }));
    for (let i = 0; i <= n - 2; i++) {
      let mi = i;
      fr.push(snap({ i: i, j: null, min: mi, line: 4, cmp: [], swap: [], done: done.slice(), c: cmp, s: swp,
        msg: '未整列の先頭は Data[' + i + ']。<strong>min_index ＝ ' + i + '</strong> としておきます。' }));
      for (let j = i + 1; j <= n - 1; j++) {
        cmp++;
        fr.push(snap({ i: i, j: j, min: mi, line: 6, cmp: [j], swap: [], done: done.slice(), c: cmp, s: swp,
          msg: 'いまの最小 Data[' + mi + ']＝' + a[mi] + ' と Data[' + j + ']＝' + a[j] + ' を比べます。' }));
        if (a[mi] > a[j]) {
          mi = j;
          fr.push(snap({ i: i, j: j, min: mi, line: 7, cmp: [], swap: [], done: done.slice(), c: cmp, s: swp,
            msg: 'こちらのほうが小さいので、<strong>min_index を ' + j + ' に更新</strong>します。' }));
        }
      }
      if (mi !== i) {
        swp++;
        const t = a[i]; a[i] = a[mi]; a[mi] = t;
        const u = ids[i]; ids[i] = ids[mi]; ids[mi] = u;
        fr.push(snap({ i: i, j: null, min: mi, line: 8, cmp: [], swap: [i, mi], done: done.slice(), c: cmp, s: swp,
          msg: '最小が見つかったので、<strong>先頭 Data[' + i + '] と入れかえます</strong>。1周につき交換は<strong>1回だけ</strong>です。' }));
      } else {
        fr.push(snap({ i: i, j: null, min: mi, line: 8, cmp: [], swap: [], done: done.slice(), c: cmp, s: swp,
          msg: 'いちばん小さいのは先頭のままだったので、入れかえは<strong>不要</strong>です。' }));
      }
      done.push(i);
      fr.push(snap({ i: i, j: null, min: null, line: 3, cmp: [], swap: [], done: done.slice(), c: cmp, s: swp,
        msg: '<strong>Data[' + i + ']＝' + a[i] + ' が確定</strong>しました。' }));
    }
    done.push(n - 1);
    fr.push(snap({ i: null, j: null, min: null, line: 11, cmp: [], swap: [], done: done.slice(), c: cmp, s: swp,
      msg: '<strong>並びかえ完了。</strong>比較 ' + cmp + ' 回、交換 ' + swp + ' 回でした。' }));
    return fr;
  }

  const BUBBLE_CODE = [
    'Data = [92, 43, 58, 17]',
    'n = 要素数(Data)',
    'i を 0 から n-2 まで 1 ずつ増やしながら繰り返す:',
    '│ j を n-2 から i まで 1 ずつ減らしながら繰り返す:',
    '│ │ もし Data[j] > Data[j+1] ならば:',
    '│ │ │ hozon = Data[j]',
    '│ │ │ Data[j] = Data[j+1]',
    '└ └ └ Data[j+1] = hozon',
    '表示する(Data)'
  ];
  const SELECT_CODE = [
    'Data = [92, 58, 17, 43]',
    'n = 要素数(Data)',
    'i を 0 から n-2 まで 1 ずつ増やしながら繰り返す:',
    '│ min_index = i',
    '│ j を i+1 から n-1 まで 1 ずつ増やしながら繰り返す:',
    '│ │ もし Data[min_index] > Data[j] ならば:',
    '│ └ └ min_index = j',
    '│ hozon = Data[i]',
    '│ Data[i] = Data[min_index]',
    '└ Data[min_index] = hozon',
    '表示する(Data)'
  ];

  /* ===================== 描画 ===================== */
  function cls(k, f) {
    if (f.done.indexOf(k) >= 0) return 'done';
    if (f.swap.indexOf(k) >= 0) return 'swap';
    if (f.cmp.indexOf(k) >= 0) return 'cmp';
    if (f.min === k) return 'min';
    return '';
  }
  /** 並びかえを「すべって入れかわる」ように見せる（FLIP）。
      同じ札（要素）を使いまわし、位置の差だけを打ち消してからアニメで戻す。 */
  const SWAP_MS = 420;
  function reorder(box, ids, make, update) {
    const kids = [...box.children];
    const map = {}; kids.forEach(function (el) { map[el.dataset.id] = el; });
    const fresh = kids.length !== ids.length || ids.some(function (id) { return !map[id]; });
    if (fresh) {
      box.innerHTML = '';
      ids.forEach(function (id, k) {
        const el = make(id); el.dataset.id = id; update(el, id, k); box.appendChild(el);
      });
      return false;
    }
    const before = {};
    kids.forEach(function (el) { before[el.dataset.id] = el.getBoundingClientRect().left; });
    ids.forEach(function (id, k) { const el = map[id]; update(el, id, k); box.appendChild(el); });
    let moved = false;
    ids.forEach(function (id) {
      const el = map[id], dx = before[id] - el.getBoundingClientRect().left;
      if (Math.abs(dx) < 1) { el.style.transition = ''; el.style.transform = ''; return; }
      moved = true;
      el.style.transition = 'none';
      el.style.transform = 'translateX(' + dx + 'px)';
      el.classList.add('moving');
      void el.offsetWidth;                                    /* 位置を確定させる */
      el.style.transition = 'transform ' + SWAP_MS + 'ms cubic-bezier(.45,.05,.35,1)';
      el.style.transform = '';
      setTimeout(function () { el.classList.remove('moving'); el.style.transition = ''; }, SWAP_MS + 40);
    });
    return moved;
  }

  function draw(pre, frames, idx, code) {
    const f = frames[idx], max = Math.max.apply(null, f.arr);
    const ids = f.ids || f.arr.map(function (_, k) { return k; });
    const val = {}; ids.forEach(function (id, k) { val[id] = f.arr[k]; });

    reorder($(pre + 'Bars'), ids,
      function () { const d = document.createElement('div'); d.innerHTML = '<i></i><span></span>'; return d; },
      function (el, id, k) {
        el.className = 'b ' + cls(k, f);
        el.style.height = Math.max(8, val[id] / max * 100) + '%';
        el.firstChild.textContent = k;
        el.lastChild.textContent = val[id];
      });

    reorder($(pre + 'Arr'), ids,
      function () { const d = document.createElement('div'); d.innerHTML = '<b></b><em></em>'; return d; },
      function (el, id, k) {
        el.className = 'c ' + cls(k, f);
        el.firstChild.textContent = val[id];
        el.lastChild.textContent = '[' + k + ']';
      });

    const vs = [];
    if (f.i !== null && f.i !== undefined) vs.push('i ＝ <b>' + f.i + '</b>');
    if (f.j !== null && f.j !== undefined) vs.push('j ＝ <b>' + f.j + '</b>');
    if (f.min !== null && f.min !== undefined) vs.push('min_index ＝ <b>' + f.min + '</b>');
    vs.push('比較 <b>' + f.c + '</b> 回');
    vs.push('交換 <b>' + f.s + '</b> 回');
    $(pre + 'Vars').innerHTML = vs.map(t => '<span class="v">' + t + '</span>').join('');
    $(pre + 'Cmp').textContent = f.c;
    $(pre + 'Swp').textContent = f.s;
    $(pre + 'Code').innerHTML = code.map((t, k) =>
      '<span class="ln' + (k + 1 === f.line ? ' on' : '') + '">(' +
      String(k + 1).padStart(2, '0') + ') ' + t.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</span>').join('');
    const n = $(pre + 'Note');
    n.className = 'note ' + (idx === frames.length - 1 ? 'ok' : 'info');
    n.innerHTML = f.msg;
    $(pre + 'Prog').textContent = (idx + 1) + ' / ' + frames.length;
  }

  /* ===================== STEP 1・2 の操作 ===================== */
  function makeRunner(pre, frames, code) {
    let i = 0, timer = null;
    const st = { get idx() { return i; } };
    function show() { draw(pre, frames, i, code); $(pre + 'Step').disabled = i >= frames.length - 1; $(pre + 'Back').disabled = i === 0; }
    $(pre + 'Step').addEventListener('click', () => { if (i < frames.length - 1) { i++; show(); } });
    $(pre + 'Back').addEventListener('click', () => { if (i > 0) { i--; show(); } });
    $(pre + 'Reset').addEventListener('click', () => { i = 0; stop(); show(); });
    $(pre + 'Play').addEventListener('click', () => { timer ? stop() : play(); });
    function play() {
      $(pre + 'Play').textContent = '止める';
      timer = setInterval(() => {
        if (i >= frames.length - 1) { stop(); return; }
        i++; show();
      }, SWAP_MS + 260);
    }
    function stop() { if (timer) clearInterval(timer); timer = null; $(pre + 'Play').textContent = '自動で動かす'; }
    show();
    return st;
  }

  /* ===================== STEP 3 比較 ===================== */
  function count(frames) { const f = frames[frames.length - 1]; return { c: f.c, s: f.s, arr: f.arr }; }
  function parseData(s) {
    const a = String(s).split(/[,、\s]+/).map(x => Number(x)).filter(x => Number.isFinite(x));
    return a.slice(0, 30);
  }
  function drawRace() {
    const a = parseData($('dataIn').value);
    const box = $('raceBox'), note = $('raceNote');
    if (a.length < 2) {
      box.innerHTML = ''; note.className = 'note ng';
      note.textContent = '数を2つ以上、「,」で区切って入れてください。';
      return;
    }
    const b = count(bubbleFrames(a)), s = count(selectionFrames(a));
    box.innerHTML =
      '<div class="col"><h4>バブルソート（交換法）</h4>' +
      '<div class="metrics"><div class="metric"><div class="k">比較</div><div class="v">' + b.c + ' 回</div></div>' +
      '<div class="metric"><div class="k">交換</div><div class="v">' + b.s + ' 回</div></div></div></div>' +
      '<div class="col"><h4>選択ソート（選択法）</h4>' +
      '<div class="metrics"><div class="metric"><div class="k">比較</div><div class="v">' + s.c + ' 回</div></div>' +
      '<div class="metric"><div class="k">交換</div><div class="v">' + s.s + ' 回</div></div></div></div>';
    note.className = 'note ok';
    note.innerHTML = '要素数 <strong>' + a.length + '</strong> のとき、比較回数はどちらも <strong>' + b.c + ' 回</strong>（＝ ' +
      a.length + '×' + (a.length - 1) + '÷2）で同じです。<br>' +
      'ちがうのは<strong>交換回数</strong>：バブル <strong>' + b.s + ' 回</strong> に対して、選択は <strong>' + s.s + ' 回</strong>。' +
      (b.s > s.s
        ? '選択ソートは1周に1回しか入れかえないので、<strong>交換が少なくてすみます</strong>。'
        : (b.s === s.s ? 'このデータでは同じでした。' : 'このデータではバブルのほうが少なくなりました。')) +
      '<br>結果：<span class="mono">[' + b.arr.join(', ') + ']</span>';
    // 増え方の表
    $('growTable').innerHTML = '<thead><tr><th>要素数 n</th><th>比較回数 n(n−1)÷2</th><th>n=4 の何倍か</th></tr></thead><tbody>' +
      [4, 8, 16, 32, 64, 100].map(n => {
        const c = n * (n - 1) / 2;
        return '<tr' + (n === a.length ? ' style="background:var(--warn-bg);font-weight:700"' : '') +
          '><td class="mono">' + n + '</td><td class="mono">' + c.toLocaleString() + '</td><td class="mono">' +
          Math.round(c / 6) + ' 倍</td></tr>';
      }).join('') + '</tbody>';
  }


  /* ===================== 手で並べかえる（人 vs アルゴリズム） ===================== */
  const H = { a: [], ids: [], mode: 'free', pick: -1, swp: 0, done: false };

  function minSwaps(src) {           /* 自由に交換できるときの最小交換回数＝n − 巡回の個数 */
    const a = src.slice(), n = a.length;
    const idx = a.map((v, i) => i).sort((x, y) => a[x] - a[y]);
    const seen = new Array(n).fill(false);
    let cyc = 0;
    for (let i = 0; i < n; i++) {
      if (seen[i]) continue;
      cyc++;
      let j = i;
      while (!seen[j]) { seen[j] = true; j = idx[j]; }
    }
    return n - cyc;
  }
  function sortedYet(a) { return a.every((v, i) => i === 0 || a[i - 1] <= v); }

  function hNew() {
    const n = 6, pool = [];
    while (pool.length < n) {
      const v = 10 + Math.floor(Math.random() * 90);
      if (pool.indexOf(v) < 0) pool.push(v);
    }
    if (sortedYet(pool)) { pool.reverse(); }
    H.a = pool; H.ids = pool.map(function (_, k) { return k; }); H.pick = -1; H.swp = 0; H.done = false;
    const b = count(bubbleFrames(H.a)), sl = count(selectionFrames(H.a));
    $('hBub').textContent = b.s + ' 回';
    $('hSel').textContent = sl.s + ' 回';
    $('hMin').textContent = minSwaps(H.a) + ' 回';
    hDraw();
    const n2 = $('hNote'); n2.className = 'note info';
    n2.innerHTML = H.mode === 'free'
      ? 'カードを2枚えらぶと入れかわります。<strong>いちばん少ない交換回数</strong>をねらってみましょう。'
      : 'いまは<strong>となりどうしだけ</strong>交換できます。これがバブルソートと同じ制限です。';
  }

  function hDraw() {
    const box = $('hCards');
    box.className = 'hand' + (H.done ? ' done' : '');
    const val = {}; H.ids.forEach(function (id, k) { val[id] = H.a[k]; });
    reorder(box, H.ids,
      function () {
        const b = document.createElement('button');
        b.innerHTML = '<b></b><em></em>';
        b.addEventListener('click', function () { hTap([...box.children].indexOf(b)); });
        return b;
      },
      function (el, id, k) {
        el.className = 'card ' + (H.done ? 'ok' : (k === H.pick ? 'pick' : ''));
        el.firstChild.textContent = val[id];
        el.lastChild.textContent = '[' + k + ']';
      });
    $('hSwp').textContent = H.swp + ' 回';
  }

  function hTap(i) {
    if (H.done) return;
    const n = $('hNote');
    if (H.pick < 0) { H.pick = i; hDraw(); return; }
    if (H.pick === i) { H.pick = -1; hDraw(); return; }
    if (H.mode === 'near' && Math.abs(H.pick - i) !== 1) {
      n.className = 'note ng';
      n.innerHTML = '<strong>となりどうししか交換できません。</strong>' +
        'バブルソートも同じで、<span class="mono">Data[j]</span> と <span class="mono">Data[j+1]</span> しか比べられません。' +
        '遠くへ動かすには、となりへの交換をくり返すしかないのです。';
      H.pick = -1; hDraw(); return;
    }
    const t = H.a[H.pick]; H.a[H.pick] = H.a[i]; H.a[i] = t;
    const u = H.ids[H.pick]; H.ids[H.pick] = H.ids[i]; H.ids[i] = u;
    H.swp++; H.pick = -1;
    if (sortedYet(H.a)) {
      H.done = true; hDraw();
      const bub = $('hBub').textContent, sel = $('hSel').textContent, min = $('hMin').textContent;
      const minN = parseInt(min, 10);
      n.className = 'note ' + (H.swp <= minN ? 'ok' : 'warn');
      n.innerHTML = '<strong>並びました。あなたは ' + H.swp + ' 回。</strong>' +
        '（最小 ' + min + '／バブル ' + bub + '／選択 ' + sel + '）<br>' +
        (H.mode === 'free'
          ? '人は<strong>全体を見わたして</strong>「どこへ動かせばよいか」がわかるので、少ない回数で並べられます。' +
            'コンピュータは全体を見わたせないので、<strong>決まった手順（アルゴリズム）</strong>で必ず並ぶようにします。' +
            'その代わり、どんなデータでも必ず終わることが保証されます。'
          : 'となりどうししか動かせないと、遠くのカードを運ぶのに何回も交換が必要でした。' +
            'これが<strong>バブルソートで交換回数が多くなる理由</strong>です。' +
            '選択ソートは「いちばん小さいものを探してから1回だけ交換」するので、交換回数が少なくなります。');
      return;
    }
    hDraw();
    n.className = 'note info';
    n.innerHTML = '交換 ' + H.swp + ' 回。いまの並び：<span class="mono">' + H.a.join(', ') + '</span>';
  }

  function init() {
    makeRunner('b', bubbleFrames([92, 43, 58, 17]), BUBBLE_CODE);
    makeRunner('s', selectionFrames([92, 58, 17, 43]), SELECT_CODE);
    $('dataIn').addEventListener('input', drawRace);
    document.querySelectorAll('[data-set]').forEach(b =>
      b.addEventListener('click', () => { $('dataIn').value = b.dataset.set; drawRace(); }));
    $('nData').addEventListener('input', () => { $('nDataV').textContent = $('nData').value; });
    $('randData').addEventListener('click', () => {
      const n = +$('nData').value, a = [];
      for (let k = 0; k < n; k++) a.push(1 + Math.floor(Math.random() * 99));
      $('dataIn').value = a.join(', '); drawRace();
    });
    drawRace();

    hNew();
    document.querySelectorAll('[data-hmode]').forEach(function (b) {
      b.addEventListener('click', function () {
        H.mode = b.dataset.hmode;
        document.querySelectorAll('[data-hmode]').forEach(x => x.classList.toggle('primary', x === b));
        hNew();
      });
    });
    $('hNew').addEventListener('click', hNew);

    Predict.make('pd1', {
      q: '[92, 43, 58, 17] をバブルソートしたとき、<strong>1周目が終わった時点</strong>の並びは？',
      type: 'pick',
      ch: ['17, 92, 43, 58', '43, 58, 17, 92', '17, 43, 58, 92', '92, 58, 43, 17'],
      answer: function () { return 0; },
      show: function () { return 'STEP 1 の「1手すすめる」で、i ＝ 0 の周が終わるまで進めると確かめられます。'; },
      why: 'この本のバブルソートは<strong>右から左へ</strong>比べていくので、1周目で<strong>いちばん小さい 17 が左端に来ます</strong>。' +
           '②は完成形、④は大きい順です。'
    });

    Predict.make('pd2', {
      q: '[92, 43, 58, 17] をバブルソートするとき、<strong>比較する回数</strong>は全部で何回？',
      type: 'num', unit: '回', placeholder: '回数',
      answer: function () { return count(bubbleFrames([92, 43, 58, 17])).c; },
      show: function (r) {
        return '要素数 n ＝ 4 のとき <span class="mono">n(n−1)÷2 ＝ 4×3÷2 ＝ ' + r + '</span> 回。' +
               '3回＋2回＋1回、と1周ごとに1回ずつ減ります。';
      },
      why: '<strong>比較回数はデータの中身に関係なく決まります。</strong>変わるのは交換回数のほうです。'
    });

    Predict.make('pd3', {
      q: 'すでに小さい順に並んでいる [1, 2, 3, 4, 5, 6, 7, 8] をバブルソートしたとき、<strong>交換する回数</strong>は？',
      type: 'num', unit: '回', placeholder: '回数',
      answer: function () { return count(bubbleFrames([1, 2, 3, 4, 5, 6, 7, 8])).s; },
      show: function () { return 'STEP 4 の「すでに並んでいる」ボタンでも同じことが確かめられます。'; },
      why: '交換は「左のほうが大きいとき」だけ起こります。すでに並んでいれば一度も起こりません。' +
           'ただし<strong>比較は 28 回そのまま行われます</strong>——バブルソートは「もう並んでいる」ことに気づけないからです。'
    });

    Quiz.choice('q12Box', 'q12Note', [
      { k: 'ア', q: '[92, 43, 58, 17] を右端2つから順に比較・交換していったとき、1周目が終わった配列は。',
        ch: ['17, 43, 58, 92', '17, 58, 92, 43', '17, 43, 92, 58', '17, 92, 43, 58'], a: 3,
        why: 'j＝2→1→0 の順に比べます。[92,43,58,17] → [92,43,17,58] → [92,17,43,58] → <strong>[17,92,43,58]</strong>。最小の17だけが左端に来ます。STEP 1 で1手ずつ確かめられます。' },
      { k: 'イ', q: '続けて2周目が終わった配列は。',
        ch: ['17, 43, 58, 92', '17, 58, 92, 43', '17, 43, 92, 58', '17, 92, 43, 58'], a: 2,
        why: '確定した Data[0] は動かさず、j＝2→1 で比べます。[17,92,43,58] → [17,43,92,58]。' },
      { k: 'ウ', q: '比べる2つのうち、左が Data[j] のとき、右の添字は。',
        ch: ['j + 1', 'j − 1', 'i − j', 'n − j', 'n − i'], a: 0,
        why: 'となり合っているので <span class="mono">j+1</span> です。' },
      { k: 'エ', q: '1周目で、変数 j はどのように繰り返すか。',
        ch: ['0から2まで1ずつ増やしながら', '1から3まで1ずつ増やしながら', '2から0まで1ずつ減らしながら', '3から1まで1ずつ減らしながら'], a: 2,
        why: '右端から比べるので<strong>減らしながら</strong>。最後の比較は Data[2] と Data[3] なので j は 2 から始まり、0 まで減ります。' },
      { k: 'オ', q: '要素数(Data) の戻り値は。',
        ch: ['3', '4', '要素数(Data)', '配列内の最大値', '配列内の最小値'], a: 1,
        why: '[92,43,58,17] は4個です。<strong>最大の添字は3ですが、要素数は4</strong>。ここを混同しないこと。' },
      { k: 'カ', q: '外側の変数 i はどのように繰り返すか。',
        ch: ['0からn−2まで1ずつ増やしながら', '1からn−1まで1ずつ増やしながら', 'n−1から1まで1ずつ減らしながら', 'n−2から0まで1ずつ減らしながら'], a: 0,
        why: '確定していく位置が左から順に増えるので、0 から n−2 まで。最後の1個は自動的に決まるので n−1 までは要りません。' },
      { k: 'キ', q: '内側の j は「どこから」i まで減らすか。',
        ch: ['n', 'n − 1', 'n − 2', 'n − i', 'n − j'], a: 2,
        why: 'j と j+1 を比べるので、j の最大は <span class="mono">n−2</span> です。n−1 にすると Data[n] を見てしまいます。' },
      { k: 'ク', q: '交換の1行目：hozon ＝ ？',
        ch: ['i', 'i + 1', 'j', 'j + 1', 'Data[i]', 'Data[i + 1]', 'Data[j]', 'Data[j + 1]', 'hozon', 'n'], a: 6,
        why: 'これから上書きされてしまう <span class="mono">Data[j]</span> を、先に hozon へ避難させます。' },
      { k: 'ケ', q: '交換の2行目：Data[j] ＝ ？',
        ch: ['i', 'i + 1', 'j', 'j + 1', 'Data[i]', 'Data[i + 1]', 'Data[j]', 'Data[j + 1]', 'hozon', 'n'], a: 7,
        why: '右の値 <span class="mono">Data[j+1]</span> を左へ移します。' },
      { k: 'コ', q: '交換の3行目：Data[j+1] ＝ ？',
        ch: ['i', 'i + 1', 'j', 'j + 1', 'Data[i]', 'Data[i + 1]', 'Data[j]', 'Data[j + 1]', 'hozon', 'n'], a: 8,
        why: '避難させておいた <span class="mono">hozon</span> を右へ入れます。この3行1組が交換の型です。' }
    ], '本文の答えは【ア】③　【イ】②　【ウ】⓪　【エ】②　【オ】①　【カ】⓪　【キ】②　【ク】⑥　【ケ】⑦　【コ】⑧ です。');

    Quiz.choice('q13Box', 'q13Note', [
      { k: 'ア', q: '[92, 58, 17, 43] を選択ソートで並べかえたとき、1回目の交換が終わった配列は。',
        ch: ['17, 43, 58, 92', '17, 58, 92, 43', '17, 92, 43, 58', '17, 43, 92, 58'], a: 1,
        why: '全体の最小は17（添字2）。先頭 Data[0]＝92 と入れかえて <strong>[17,58,92,43]</strong>。STEP 2 で確かめられます。' },
      { k: 'イ', q: '2回目の交換が終わった配列は。',
        ch: ['17, 43, 58, 92', '17, 58, 92, 43', '17, 92, 43, 58', '17, 43, 92, 58'], a: 3,
        why: '未整列 [58,92,43] の最小は43（添字3）。Data[1]＝58 と入れかえて <strong>[17,43,92,58]</strong>。' },
      { k: 'ウ', q: '外側の i は 0 からいくつまで繰り返すか。',
        ch: ['n + 1', 'n − 1', 'n + 2', 'n − 2', 'n'], a: 3,
        why: '最後の1個は自動的に決まるので <span class="mono">n−2</span> までで十分です。' },
      { k: 'エ', q: '内側の j はどこから始めるか。',
        ch: ['i + 1', 'i − 1', 'i + 2', 'i − 2', 'i'], a: 0,
        why: 'Data[i] を「いまの最小」としているので、<strong>その次</strong>の <span class="mono">i+1</span> から探します。' },
      { k: 'オ', q: 'min_index を更新する条件は。',
        ch: ['Data[i] &lt; Data[j]', 'Data[i] &gt; Data[j]', 'Data[min_index] &lt; Data[j]', 'Data[min_index] &gt; Data[j]'], a: 3,
        why: '比べる相手は Data[i] ではなく<strong>いまの最小 Data[min_index]</strong>。それより小さければ更新します。' },
      { k: 'カ', q: '交換の1行目：hozon ＝ ？',
        ch: ['Data[i]', 'Data[i + 1]', 'Data[j]', 'Data[j + 1]', 'Data[min_index]', 'hozon', 'n', 'i', 'j'], a: 0,
        why: '上書きされる <span class="mono">Data[i]</span> を先に避難させます。' },
      { k: 'キ', q: '交換の2行目：Data[i] ＝ ？',
        ch: ['Data[i]', 'Data[i + 1]', 'Data[j]', 'Data[j + 1]', 'Data[min_index]', 'hozon', 'n', 'i', 'j'], a: 4,
        why: '見つけた最小 <span class="mono">Data[min_index]</span> を先頭へ移します。' },
      { k: 'ク', q: '交換の3行目：Data[min_index] ＝ ？',
        ch: ['Data[i]', 'Data[i + 1]', 'Data[j]', 'Data[j + 1]', 'Data[min_index]', 'hozon', 'n', 'i', 'j'], a: 5,
        why: '避難させた <span class="mono">hozon</span> を、最小があった場所へ入れます。' }
    ], '本文の答えは【ア】①　【イ】③　【ウ】③　【エ】⓪　【オ】③　【カ】⓪　【キ】④　【ク】⑤ です。');

    window.Terms.glossary($('glossBox'), ['アルゴリズム', '配列', '添字', '整列', 'バブルソート', '選択ソート', '線形探索', '二分探索', '変数']);
    window.Terms.attach();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
