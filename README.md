# 整列のアルゴリズムを動かして理解する

『大学入学共通テスト「情報Ⅰ」対策問題集』（技術評論社, ISBN 978-4-297-15084-6）pp.78-84 連動Webアプリ。

**公開URL**: https://technical-reviewer-information1.github.io/sort-visualizer/

バブルソートと選択ソートを1手ずつ動かします。交換のときは棒がすべって入れかわるので、何が起きたかがそのまま見えます。2つを並べて同時に動かし、棒の数を増やして差を確かめられます。

## 技術

静的な HTML / CSS / JavaScript のみで動作します。ビルド不要・外部CDN不使用・サーバ通信なし。
GitHub Pages で配信しており、Python や Streamlit は不要です。スマートフォン／タブレット／PC に対応。

```
index.html
css/style.css   全アプリ共通スタイル
css/app.css     このアプリ固有のスタイル
js/app.js       画面制御
```

`app.py` は旧版（Streamlit Community Cloud 用）です。

---
Created by Dit-Lab.(Daiki ITO) / Supported by Tomoaki ATSUMI
