from datetime import datetime, timedelta
now = datetime.now()
tomorrow = (now + timedelta(days=1)).replace(hour=0, minute=0, second=0, microsecond=0)


print(now, tomorrow.isoformat())