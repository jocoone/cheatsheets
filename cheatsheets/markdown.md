---
title: Markdown in Cheatsheets
author: Joey Comhaire
date: 2023-01-04
tags: Markdown, Cheatsheet, Knowledge Sharing
---

This is a short explanation about what you can do to create cheatsheet on this platform. If something is missing, feel free to add extra information or help making this platform even better.

This cheatsheet is base on an already existing [markdown cheatsheet](https://www.markdownguide.org/cheat-sheet/).

**The markdown is actual MDX. I's a subset of markdown which is used to create html pages in a markdown way instead of writing all the HTML code yourself.**

# Basic Syntax

## Headings

Headings might probably be the easiest thing to write in `markdown`. You have 3 levels of headings: H1, H2, H3, H4, H5, H6 which match follow markdown structure:

```markdown
# This is a H1 header

## This is a H2 header

### This is a H3 header

#### This is a H4 header

##### This is a H5 header

###### This is a H6 header
```

As you can see, hovering over every title will display a link icon to the left of it. This will create a permalink to a specific section inside your url bar. You can use this link to share with others about a specific part of the page.

## Text Styling

Basic text styling can be added inside your markdown. This includes **bold text**, _italic text_, ~~strikethrough text~~, `code blocks` and a [links](https:/google.com).

```markdown
**This is bld text**

_This is italic text_

`This is a code block`

~This is strikethrough text~

[link text over here](https://url_over.here)
```

## Block elements

Block elements are a bit more special. These dont only change the font style but can also impact the addition of extra styling in order to get them visualised in the proper way.

### Blockquotes

The first one is a blockquote. These are used to visualise important quotes made by someone of importance shown like this:

> Tell me and I forget. Teach me and I remember. Involve me and I learn.
>
> Benjamin Franklin

```markdown
> Tell me and I forget. Teach me and I remember. Involve me and I learn.
>
> Benjamin Franklin
```

It is even possible to create nested blockquotes if you want:

> Tell me and I forget. Teach me and I remember. Involve me and I learn.
>
> Benjamin Franklin
>
> > I beg to differ.
> >
> > His wife

```markdown
> Tell me and I forget. Teach me and I remember. Involve me and I learn.
>
> Benjamin Franklin
>
> > I beg to differ.
> >
> > His wife
```

### Ordered/unordered list

People love lists. Therefor like in html you can create ordered and unordered lists.

- Unordered list item 1
- Unordered list item 2
- Unordered list item 3

```markdown
- Unordered list item 1
- Unordered list item 2
- Unordered list item 3
```

1. Unordered list item 1
2. Unordered list item 2
3. Unordered list item 3

```markdown
1. Ordered list item 1
2. Ordered list item 2
3. Ordered list item 3
```

### Tasklist

- [ ] todo
- [x] done

```markdown
- [ ] todo
- [x] done
```

### Horizontal rule

Sometimes you need rules. So in order to split your content you can always use a horizontal rule like this:

---

```markdown
---
```

### Images

It is possible to include images inside your markdown files. You can either use images with urls from the internet or local images deployed on this platform.

![Logo of Axxes](/axxes.svg)

![Image of a penguin](https://images.unsplash.com/photo-1598257733238-97cf162c5ae0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80)

```markdown
![Logo of Axxes](/axxes.svg)
![Alt text of the image](url on the internet)
```

### Code Blocks

And maybe even the most important one is a code block. What should we do without this? **It is important to add the language inside your markdown code block to get the correct visualisation and syntax highlighting.**

```js
let x, y, z; // Statement 1
x = 5; // Statement 2
y = 6; // Statement 3
z = x + y; // Statement 4
```

```json
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
```

```markdown
'''js
code over here
'''
```

**_The ' are actual backticks `_**

If you want to show commands you can always use `cli` as a language in order to get the > character automatically added in front of your command

```cli
mkdir Cheatsheets
```

or with multiple lines

```cli
mkdir Cheatsheets
cd Cheatsheets
touch index.py
```

# Extended Syntax

## Table

You can even render tables inside a markdown file. Let`s not use them to much but you can if you want to _(I hate tables)_ 😄

| Syntax    | Description |
| --------- | ----------- |
| Header    | Title       |
| Paragraph | Text        |

```markdown
| Syntax    | Description |
| --------- | ----------- |
| Header    | Title       |
| Paragraph | Text        |
```

## Footnotes

If you want to explain something further you can always use footnotes like this [^1][^2].

[^1]: This is the footnote.
[^2]: This is the second footnote.

```markdown
If you want to explain something further you can always use footnotes like this [^1][^2].

[^1]: This is the footnote.
[^2]: This is the second footnote.
```
