import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_application_1/services/session_service.dart';

class GraphQLConfig {
  static String token = '';
  static final SessionService _sessionService = SessionService();
  
  static final HttpLink httpLink = HttpLink(
    'http://localhost:3000/graphql',
  );

  static final AuthLink authLink = AuthLink(
    getToken: () async {
      // Get the current token from session service
      final sessionToken = await _sessionService.getSessionToken();
      return sessionToken != null ? 'Bearer $sessionToken' : null;
    },
  );

  static final Link link = authLink.concat(httpLink);

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
