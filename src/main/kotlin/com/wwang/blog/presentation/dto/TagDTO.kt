package com.wwang.blog.presentation.dto

import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import com.fasterxml.jackson.annotation.JsonProperty

@JsonIgnoreProperties(ignoreUnknown = true)
data class TagDTO(
    @get:JsonProperty("tag_id")
    val id: Long,
    val tagName: String
)
