package com.wwang.blog

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.context.properties.ConfigurationPropertiesScan
import org.springframework.boot.runApplication

@SpringBootApplication
@ConfigurationPropertiesScan
class BlogApplication

fun main(args: Array<String>) {
    runApplication<BlogApplication>(*args)
}
