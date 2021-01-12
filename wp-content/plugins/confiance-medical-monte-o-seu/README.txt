=== Plugin Name ===
Contributors: (this should be a list of wordpress.org userid's)
Donate link: http://example.com/
Tags: comments, spam
Requires at least: 3.0.1
Tested up to: 3.4
Stable tag: 4.3
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Aqui está uma breve descrição do plugin. Não deve ter mais de 150 caracteres. Sem marcação aqui.

== Description ==

Esta é a longa descrição. Sem limite, e você pode usar Markdown (assim como nas seções a seguir).

Para compatibilidade com versões anteriores, se esta seção estiver ausente, o comprimento total da breve descrição será usado, e
Markdown analisado.

Algumas notas sobre as seções acima:

*   "Contributors" é uma lista separada por vírgulas de nomes de usuário wp.org/wp-plugins.org
*   "Tags" é uma lista separada por vírgulas de tags que se aplicam ao plugin
*   "Requires at least" é a versão mais baixa em que o plugin funcionará
*   "Tested up to" é a versão mais recente que você *usou com sucesso para testar o plugin*. Observe que pode funcionar em
versões superiores ... esta é apenas a mais alta que você verificou.
*   "Stable tag" deve indicar a "tag" do Subversion da última versão estável, ou "trunk", se você usar `/ trunk /` para
stable.

    Observe que o `readme.txt` da tag stable é aquele que é considerado o definidor do plugin, então
se o arquivo `/ trunk / readme.txt` diz que a tag stable é` 4.3`, então é `/ tags / 4.3 / readme.txt` que será usado
para exibir informações sobre o plugin. Nesta situação, a única coisa considerada no trunk `readme.txt`
é o ponteiro de tag estável. Assim, se você desenvolver no tronco, você pode atualizar o trunk `readme.txt` para refletir as mudanças no
sua versão em desenvolvimento, sem ter essas informações divulgadas incorretamente sobre a versão estável atual
que não tem essas mudanças - desde que o `readme.txt` do tronco aponte para a tag estável correta.

    Se nenhuma tag estável for fornecida, presume-se que o tronco seja estável, mas você deve especificar "trunk" se for onde
você coloca a versão estável, a fim de eliminar qualquer dúvida.

== Installation ==

Esta seção descreve como instalar o plug-in e fazê-lo funcionar.

e.g.

1. Upload `conf-med-monte.php` to the `/wp-content/plugins/` directory
1. Activate the plugin through the 'Plugins' menu in WordPress
1. Place `<?php do_action('conf_med_monte_hook'); ?>` in your templates

== Frequently Asked Questions ==

= Uma pergunta que alguém pode ter =

Uma resposta a essa pergunta.

= What about foo bar? =

Answer to foo bar dilemma.

== Screenshots ==

1. A descrição desta captura de tela corresponde à captura de tela 1. (png | jpg | jpeg | gif). Observe que a captura de tela foi tirada de
o diretório / assets ou o diretório que contém o readme.txt estável (tags ou turnk). Capturas de tela em / assets
diretório têm precedência. Por exemplo, `/ assets / screenshot-1.png` venceria` / tags / 4.3 / screenshot-1.png`
(or jpg, jpeg, gif).
2. This is the second screen shot

== Changelog ==

= 1.0 =
* Uma mudança desde a versão anterior.
* Outra mudança.

= 0.5 =
* Liste as versões da mais recente na parte superior para a mais antiga na parte inferior.

== Upgrade Notice ==

= 1.0 =
Avisos de atualização descrevem o motivo pelo qual um usuário deve atualizar. Não mais do que 300 caracteres.

= 0.5 =
Esta versão corrige um bug relacionado à segurança. Atualize imediatamente.

== Arbitrary section ==

Você pode fornecer seções arbitrárias, no mesmo formato que as acima. Isso pode ser útil para casos extremamente complicados
plug-ins onde mais informações precisam ser transmitidas que não se enquadram nas categorias de "Description" ou
"Installation." As seções arbitrárias serão mostradas abaixo das seções integradas descritas acima.

== Um breve exemplo de Markdown ==

Ordered list:

1. Some feature
1. Another feature
1. Something else about the plugin

Unordered list:

* something
* something else
* third thing

Here's a link to [WordPress](http://wordpress.org/ "Your favorite software") and one to [Markdown's Syntax Documentation][markdown syntax].
Titles are optional, naturally.

[markdown syntax]: http://daringfireball.net/projects/markdown/syntax
            "Markdown is what the parser uses to process much of the readme file"

Markdown uses email style notation for blockquotes and I've been told:
> Asterisks for *emphasis*. Double it up  for **strong**.

`<?php code(); // goes in backticks ?>`