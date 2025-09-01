---
layout: default
title: "Darvan"
---

<main class="main-container">
  <!-- Description -->
  <section class="description">
    <p class="description-line">
      The goal of life is to serve with wisdom, justice, and faith. Every work has value when it serves humanity, uplifts the nation, and brings us closer to God and to one another.
    </p>
  </section>

  <!-- Dynamic life list -->
  <section class="life-list">
    {% for item in site.life %}
      <a class="life-item" href="{{ item.url }}">{{ item.title | downcase }}</a>
    {% endfor %}
  </section>

  <!-- Featured image -->
  <section class="featured-image-section">
    <img 
      src="/assets/images/home.jpg" 
      alt="Featured Image" 
      class="featured-image"
    >
  </section>
</main>
