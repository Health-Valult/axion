import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_application_1/services/session_service.dart';
import 'package:flutter_application_1/services/env_config.dart';

/// Configuration for GraphQL client setup and management.
/// Uses environment variables from EnvConfig for URLs and authentication.
class GraphQLConfig {
  static String token = '';
  static final SessionService _sessionService = SessionService();
  
  static final HttpLink httpLink = HttpLink(
    EnvConfig.graphqlUrl,
  );

  static final AuthLink authLink = AuthLink(
    getToken: () async {
      // Get the current token from session service
      final sessionToken = await _sessionService.getSessionToken();
      return sessionToken != null ? 'Bearer $sessionToken' : null;
    },
  );

  static final Link link = authLink.concat(httpLink);

  /// Default GraphQL client with network-only fetch policy for real-time data
  static GraphQLClient client = GraphQLClient(
    cache: GraphQLCache(store: InMemoryStore()),
    link: link,
    defaultPolicies: DefaultPolicies(
      query: Policies(
        fetch: FetchPolicy.networkOnly,
      ),
      mutate: Policies(
        fetch: FetchPolicy.networkOnly,
      ),
      subscribe: Policies(
        fetch: FetchPolicy.networkOnly,
      ),
    ),
  );

  /// Initialize a new GraphQL client with default settings
  static ValueNotifier<GraphQLClient> initializeClient() {
    return ValueNotifier(
      GraphQLClient(
        cache: GraphQLCache(store: InMemoryStore()),
        link: link,
        defaultPolicies: DefaultPolicies(
          query: Policies(
            fetch: FetchPolicy.networkOnly,
          ),
          mutate: Policies(
            fetch: FetchPolicy.networkOnly,
          ),
          subscribe: Policies(
            fetch: FetchPolicy.networkOnly,
          ),
        ),
      ),
    );
  }

  /// Update the client's authentication token
  static void updateToken(String newToken) {
    token = newToken;
    client = GraphQLClient(
      cache: GraphQLCache(store: InMemoryStore()),
      link: link,
      defaultPolicies: DefaultPolicies(
        query: Policies(
          fetch: FetchPolicy.networkOnly,
        ),
        mutate: Policies(
          fetch: FetchPolicy.networkOnly,
        ),
        subscribe: Policies(
          fetch: FetchPolicy.networkOnly,
        ),
      ),
    );
  }
}
