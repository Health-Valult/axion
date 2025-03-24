class Link {
  final String id;
  final String title;
  final String url;
  final String? description;
  final DateTime createdAt;

  Link({
    required this.id,
    required this.title,
    required this.url,
    this.description,
    required this.createdAt,
  });

  factory Link.fromJson(Map<String, dynamic> json) {
    return Link(
      id: json['id'] as String,
      title: json['title'] as String,
      url: json['url'] as String,
      description: json['description'] as String?,
      createdAt: DateTime.parse(json['createdAt'] as String),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'url': url,
      'description': description,
      'createdAt': createdAt.toIso8601String(),
    };
  }
}
