package com.wwang.blog.presentation.dto

import com.fasterxml.jackson.annotation.JsonIgnoreProperties

@JsonIgnoreProperties(ignoreUnknown = true)
data class BlogCreationDTO(
    val title: String,
    val content: String?,
    val tags: Set<String>
)
