<?php

$finder = PhpCsFixer\Finder::create()
    ->in([
        __DIR__ . '/app',
        __DIR__ . '/config',
        __DIR__ . '/routes',
        __DIR__ . '/tests',
    ])
    ->exclude('bootstrap/cache')
    ->exclude('storage')
    ->name('*.php')
    ->notName('*.blade.php');

return (new PhpCsFixer\Config())
    ->setIndent('  ')
    ->setLineEnding("\n")
    ->setRules([
        '@PSR2' => true,
        '@PHP74Migration' => true,
        'array_syntax' => ['syntax' => 'short'],
        'binary_operator_spaces' => true,
        'blank_line_after_opening_tag' => true,
        'compact_nullable_typehint' => true,
        'declare_equal_normalize' => true,
        'increment_style' => ['style' => 'post'],
        'no_unused_imports' => true,
        'ordered_imports' => ['sort_algorithm' => 'alpha'],
        'single_quote' => true,
        'trim_array_spaces' => true,
        'trailing_comma_in_multiline' => ['elements' => ['arrays', 'arguments']],
    ])
    ->setFinder($finder);
